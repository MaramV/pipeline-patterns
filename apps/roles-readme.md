## App Accounts \ Roles Template

### roles-template.yaml
This CloudFormation template is deployed into the applications accounts (`otc-ecom-dev`, `otc-ecom-qa`, `otc-ecom-preprod`, and `otc-ecom-prod`) to create the IAM Roles, Policies, and necessary resources to support deploying CodePipeline artifacts.  Pipelines are deployed to the `otc-ecom-shared` account.

The template defines:
- Incoming Parameters
    - Short app name (like `otc`) to tag and prefix resources
    - `otc-ecom-shared` AWS Account ID
    - KMS Key Arn in `otc-ecom-shared` for use with Pipeline Artifacts
    - The SSM Parameter name that stores Migration Acceleration Program tag value
- Resources
    - Cross Account Role
    - Cross Account Policy
    - CodeDeploy Role

### Building and Deploying
CloudFormation templates can be validated, packaged, and deployed.  Parameters are used, so the same template can be used for multiple projects or accounts.  This is done using the [AWS Command Line Interface](https://aws.amazon.com/cli/)

Assumption: Named profiles for `otc-ecom-dev`, `otc-ecom-qa`, `otc-ecom-preprod`, and `otc-ecom-prod` for doing anything local.

To validate the template:
```shell
aws cloudformation validate-template --template-body file://roles-template.yaml --profile otc-ecom-dev --region us-west-2
```

To package the template:
```shell
aws cloudformation package --template-file roles-template.yaml --s3-bucket 232137109144-cf-stacks --output-template-file packaged.yaml --profile otc-ecom-dev --region us-west-2
```

To Deploy the project to the different accounts:
```shell
# Deployment to otc-ecom-dev
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 232137109144-cf-stacks --s3-prefix cicd-app-roles --stack-name cicd-app-roles --capabilities CAPABILITY_NAMED_IAM --profile otc-ecom-dev --region us-west-2
```
