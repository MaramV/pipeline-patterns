## Shared Account \ Deploy Template

### deploy-template.yaml
This CloudFormation template is deployed into the `otc-ecom-shared` account to create resources that will be used by deployment pipelines.

The template defines:
- Incoming Parameters
    - Short app name (like `otc`) to tag and prefix resources
    - The `otc-ecom-dev` AWS Account Id
    - The SSM Parameter that stored Migration Acceeleration Program tag value
    - The SSM Parameter that stores the GitHub connection Arn
- Resources
    - KMS Encryption Key for CodePipeline Artifacts
    - KMS Key Alias
    - SNS Topic for Pipeline Notifications
    - SNS Topic for Pipeline Failure Notifications
    - SNS Topic Policy
    - IAM Policy for S3 and KMS Artifact Access
    - CodePipeline IAM Role
    - CodePipeline IAM Policy
    - CodeBuild IAM Role
    - CodeBuild IAM Policy
    - S3 Artifact Bucket
    - S3 Artifact Policy
    - SSM Parameters
        - KMS Key Arn
        - S3 Artifact Bucket Name
        - SNS Topic for Notifications
        - SNS Topic for Failure Notifications

### Building and Deploying
CloudFormation templates can be validated, packaged, and deployed.  Parameters are used, so the same template can be used for multiple projects or accounts.  This is done using the [AWS Command Line Interface](https://aws.amazon.com/cli/)

Assumption: Named profiles for `otc-ecom-shared`

To validate the template:
```shell
aws cloudformation validate-template --template-body file://deploy-template.yaml --profile ortc-ecom-shared --region us-west-2
```

To package the template:
```shell
sam package --template-file deploy-template.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix shared-deploy-bootstrap --output-template-file packaged.yaml --profile ortc-ecom-shared --region us-west-2
```

To deploy the template:
```shell
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix shared-deploy-bootstrap --stack-name shared-deploy-bootstrap --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2
```