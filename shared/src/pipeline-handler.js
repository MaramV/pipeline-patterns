const AWS = require("aws-sdk");
const fs = require("fs");
const zip = require("jszip");
const nodemailer = require("nodemailer");

exports.handler = function(event, context) {
  console.log("Event: ", JSON.stringify(event, null, 2));
  const jobId = event["CodePipeline.job"].id;

  const bucket = event["CodePipeline.job"].data.inputArtifacts[0].location.s3Location.bucketName;
  const key = event["CodePipeline.job"].data.inputArtifacts[0].location.s3Location.objectKey;

  const s3 = new AWS.S3();
  const codepipeline = new AWS.CodePipeline();

  const putJobSuccess = function(message) {
    const params = {
      jobId
    };

    codepipeline.putJobSuccessResult(params, function(err, data) {
      if (err) {
        console.error(err);
      } else {
        context.succeed(message);
      }
    });
  };

  const putJobFailure = function(message) {
    const params = {
      jobId,
      failureDetails: {
        message: JSON.stringify(message),
        type: 'JobFailed',
        externalExecutionId: context.awsRequestId
      }
    };

    codepipeline.putJobFailureResult(params, function(err, data) {
      context.fail(message);
    });
  };

  const getFile = function(callback) {
    const s3Params = {
      Key: key,
      Bucket: bucket
    };
    const keyParts = key.split("/");
    const filename = `/tmp/${keyParts[keyParts.length - 1]}.zip`;

    s3.getObject(s3Params)
      .promise()
      .then((data) => {
        return zip.loadAsync(data.Body);
      })
      .then((zip) => {
        return zip.file("email_content.json").async("string");
        // console.log("Zip: ", zip);
        // putJobSuccess("Success");
      })
      .then((file) => {
        console.log("File: ", file);
        //putJobSuccess("Success");
        callback(JSON.parse(file));
      });
  };

  getFile(function(json) {
    console.log("Response: ", json);

    const htmlMessage = `<p>
Build ${json.build_id} complete
</p>
<ul>
  <li>Commit: ${json.commit_id}</li>
  <li>Repository: ${json.repo}</li>
  <li>Branch: ${json.branch}</li>
  <li>Author: ${json.author}</li>
  <li>Artifact: ${json.artifact}</li>
</ul>
`;

    const textMessage = `Build ${json.build_id} complete

- Commit: ${json.commit_id}
- Repository: ${json.repo}
- Branch: ${json.branch}
- Author: ${json.author}
- Artifact: ${json.artifact}
`;

    const message = {
      from: "no-reply@orientaltrading.com",
      to: "david.simmon@opti9tech.com",
      subject: `AWS CodeBuild Build Complete | ${json.repo}`,
      text: textMessage,
      html: htmlMessage
    };

    console.log("Email Message: ", message);

    const transport = nodemailer.createTransport({
      host: "mail.oriental.com",
      port: 25
    });

    transport.sendMail(message, function(err, info) {
      if (err) {
        console.error("SendMail Error: ", err);
      } else {
        console.log("Mail Sent: ", info);
      }
      putJobSuccess("Success");
    });
  });
};
