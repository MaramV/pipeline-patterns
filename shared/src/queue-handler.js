"use strict";
const aws = require("aws-sdk");
const nodemailer = require("nodemailer");

exports.handler = async function(event, context, callback) {
  console.log("Event: ", event);

  for (const evRecord of event.Records) {
    const body = JSON.parse(evRecord.body);

    if (body.Event === "s3:TestEvent") {
      // Nothing to do here
    } else {
      // Process the message here
      //console.log(`body: ${JSON.stringify(body, null, 2)}`);
      const pipelineMessage = JSON.parse(body.Message);

      //console.log(`pipeline: ${JSON.stringify(pipelineMessage, null, 2)}`);

      const state = pipelineMessage.detail.state;
      const pipeline = pipelineMessage.detail.pipeline;
      const executionId = pipelineMessage.detail["execution-id"];

      let subject;
      let htmlMessage;
      let textMessage;

      if ((state === "FAILED") || (state === "SUCCEEDED")) {
        const buildVariables = await GetBuildDetails(pipeline, executionId);

        subject = `AWS CodeBuild Build ${state} | ${buildVariables.REPO}`;

        htmlMessage = `<p>
Build ${buildVariables.BUILD_GUID} ${state}
</p>
<ul>
  <li>Commit: ${buildVariables.LAST_HASH}</li>
  <li>Repository: ${buildVariables.REPO}</li>
  <li>Branch: ${buildVariables.BRANCH}</li>
  <li>Author: ${buildVariables.AUTHOR_EMAIL}</li>
  <li>Artifact: ${buildVariables.ARTIFACT}</li>
  <li>Asset Date: ${buildVariables.ASSET_DATE}</li>
</ul>
`;
        textMessage = `Build ${buildVariables.BUILD_GUID} ${state}

- Commit: ${buildVariables.LAST_HASH}
- Repository: ${buildVariables.REPO}
- Branch: ${buildVariables.BRANCH}
- Author: ${buildVariables.AUTHOR_EMAIL}
- Artifact: ${buildVariables.ARTIFACT}
- Asset Date: ${buildVariables.ASSET_DATE}
`;

        await SendEmail(subject, htmlMessage, textMessage);
      }
    }
  }
};

async function GetBuildDetails(pipeline, executionId) {
  return new Promise((resolve, reject) => {
    let toReturn = {
      BUILD_GUID: "",
      LAST_HASH: "",
      REPO: "",
      BRANCH: "",
      AUTHOR_EMAIL: "",
      ARTIFACT: "",
      ASSET_DATE: ""
    };
    const codePipeline = new aws.CodePipeline();
    const params = {
      pipelineName: pipeline,
      filter: {
        pipelineExecutionId: executionId
      }
    };

    codePipeline.listActionExecutions(params, function(err, data) {
      if (err) {
        console.error("Pipeline error: ", err);
        reject(err);
      } else {
        for (const detail of data.actionExecutionDetails) {
          if (detail.actionName === "build-from-source") {
            toReturn.BUILD_GUID = detail.output.outputVariables.BUILD_GUID;
            toReturn.LAST_HASH = detail.output.outputVariables.LAST_HASH;
            toReturn.AUTHOR_EMAIL = detail.output.outputVariables.AUTHOR_EMAIL;
            toReturn.ARTIFACT = detail.output.outputVariables.ARTIFACT;
            toReturn.ASSET_DATE = detail.output.outputVariables.ASSET_DATE;
          }

          if (detail.actionName === "get-source-code") {
            toReturn.REPO = detail.output.outputVariables.FullRepositoryName;
            toReturn.BRANCH = detail.output.outputVariables.BranchName;
          }
        }

        resolve(toReturn);
      }
    });
  });
}

function SendEmail(subject, htmlMessage, textMessage) {
  return new Promise((resolve, reject) => {
    const message = {
      from: "no-reply@oriental.com",
      to: "JavaAppDev@oriental.com",
      cc: "david.simmon@opti9tech.com",
      subject: subject,
      html: htmlMessage,
      text: textMessage
    };

    console.log(`Email Message: ${JSON.stringify(message, null, 2)}`);

    const transport = nodemailer.createTransport({
      host: "mail.oriental.com",
      port: 25
    });

    transport.sendMail(message, function(err, info) {
      if (err) {
        console.error("SendMail Error: ", err);
        reject(err);
      } else {
        console.log("Mail Sent: ", info);
        resolve(true);
      }
    });
  });
}