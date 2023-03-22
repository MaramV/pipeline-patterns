# OTC Pipeline Pattern Repository
This repository will be used for CloudFormation templates, and necessary resources, to create CI/CD Pipelines for releasing projects.

The templates in the `./shared` directory are for use in the `otc-ecom-shared` AWS account.  These templates will create resources like CodeBuild and CodePipeline to get source code, and build artifacts.  As well as S3 and KMS to store and encrypt those artifacts, and IAM Roles and Policies for service accounts to do the pipeline execution and builds.

The templates in the `./apps` directory are for use in the accounts the artifacts are deployed to: `otc-ecom-dev`, `otc-ecom-qa`, `otc-ecom-preprod`, and `otc-ecom-prod`.  This will start with IAM Roles and Policies that CodePipeline can assume in the account, as well as any resources needed in the destination account to support the deployment.

## Deployment
When initially deploying this template, the IAM Role in the application accounts needs a policy to access a KMS Key in the shared account.  But that KMS Key needs to be created in the shared account, with it's policy allowing the IAM Role in the application accounts.

I absolve this circular dependency by deploying the `./apps/roles-template.yaml` file commenting out the parameter `pKmsKey` and the places it is used.  Deploy this template into the application accounts.  Then deploy the `./shared/deploy-template.yaml` to create the KMS key and KMS policy to allow access to the user in the application accounts.  Lastly, uncomment the `pKmsKey` parameter, and where it's used, and redeploy `./apps/roles-template.yaml`

## Pipelines
Each pipeline will utilize a buildspec.yaml file.  This will be included in the source repository, and will provide the instructions to the build resource on how to build the project and what the output artifact is.