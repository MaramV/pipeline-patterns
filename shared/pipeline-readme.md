To validate the template:
```shell
aws cloudformation validate-template --template-body file://pipeline-template.yaml --profile ortc-ecom-shared --region us-west-2
```

To package the template:
```shell
aws cloudformation package --template-file pipeline-template.yaml --s3-bucket 969702943927-cf-stacks --output-template-file packaged.yaml --profile ortc-ecom-shared --region us-west-2
```

To Deploy the template:
```shell
# otc-infra
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-otc-infra-development --stack-name pipeline-otc-infra-development --parameter-overrides pRepo=otc-infra --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# OTC-order-number-svc - POC1
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-OTC-order-number-svc-development --stack-name pipeline-OTC-order-number-svc-development --parameter-overrides pRepo=OTC-order-number-svc pBranch=Developer_DSimmon_Opti9 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# ecom-svc-webcms - POC2
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-ecom-svc-webcms-development --stack-name pipeline-ecom-svc-webcms-development --parameter-overrides pRepo=ecom-svc-webcms pBranch=FEAT_2021_AWS_Migration_0921 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# ecom-svc-customer - POC2
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-ecom-svc-customer-development --stack-name pipeline-ecom-svc-customer-development --parameter-overrides pRepo=ecom-svc-customer pBranch=FEAT_2021_AWS_Migration_0921 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# oms-delivery-micro-service - POC2
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-oms-delivery-micro-service-development --stack-name pipeline-oms-delivery-micro-service-development --parameter-overrides pRepo=oms-delivery-micro-service pBranch=master --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# Phase II
# global-svc-registry
# Global Service Registry
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-global-svc-registry-development --stack-name pipeline-global-svc-registry-development --parameter-overrides pRepo=global-svc-registry pBranch=FEAT_2021_AWS_Migration_0921 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# Customer Master
# ecom-svc-customer-master
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-ecom-svc-customer-master-development --stack-name pipeline-ecom-svc-customer-master-development --parameter-overrides pRepo=ecom-svc-customer-master pBranch=FEAT_2021_AWS_Migration_0921 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# Shopping cart
# ecom-svc-shoppingcart
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-ecom-svc-shoppingcart-development --stack-name pipeline-ecom-svc-shoppingcart-development --parameter-overrides pRepo=ecom-svc-shoppingcart pBranch=FEAT_2021_AWS_Migration_0921 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# Product PZN
# global-svc-pzn-product
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-global-svc-pzn-product-development --stack-name pipeline-global-svc-pzn-product-development --parameter-overrides pRepo=global-svc-pzn-product pBranch=FEAT_2021_AWS_Migration_0921 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# Wishlist Service
# ecom-svc-wishlist
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-ecom-svc-wishlist-development --stack-name pipeline-ecom-svc-wishlist-development --parameter-overrides pRepo=ecom-svc-wishlist pBranch=FEAT_2021_AWS_Migration_0921 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# Vertex EST4
# oms-vertex-micro-service
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-oms-vertex-micro-service-development --stack-name pipeline-oms-vertex-micro-service-development --parameter-overrides pRepo=oms-vertex-micro-service pBranch=FEAT_2021_AWS_Migration_0921 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# New Pattern for three repos being treated as one deployment
# oms-1x-promo-business
# oms-1x-promo-client
# oms-1x-promo-service
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-oms-1x-promo-service-development --stack-name pipeline-oms-1x-promo-service-development --parameter-overrides pRepo=oms-1x-promo-service pRepoSecond=oms-1x-promo-business pRepoThird=oms-1x-promo-client pBranch=FEAT_2021_AWS_Migration_0921 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# global-svc-ldap-auth
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-global-svc-ldap-auth-development --stack-name pipeline-global-svc-ldap-auth-development --parameter-overrides pRepo=global-svc-ldap-auth pBranch=FEAT_2021_AWS_Migration_0921 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# ecom-svc-rewards
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-ecom-svc-rewards-development --stack-name pipeline-ecom-svc-rewards-development --parameter-overrides pRepo=ecom-svc-rewards pBranch=FEAT_2021_AWS_Migration_0921 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# New Pattern for three repos being treated as one deployment
# oms-12c-promotion-service
# oms-promotion-service-client
# oms-promotion-service-business
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-oms-12c-promotion-service-development --stack-name pipeline-oms-12c-promotion-service-development --parameter-overrides pRepo=oms-12c-promotion-service pRepoSecond=oms-promotion-service-client pRepoThird=oms-promotion-service-business pBranch=FEAT_2021_AWS_Migration_0921 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# ecom-svc-email-subscription
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-ecom-svc-email-subscription-development --stack-name pipeline-ecom-svc-email-subscription-development --parameter-overrides pRepo=ecom-svc-email-subscription pBranch=FEAT_2021_AWS_Migration_0921 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# oms-aftership-service
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-oms-aftership-service-development --stack-name pipeline-oms-aftership-service-development --parameter-overrides pRepo=oms-aftership-service pBranch=FEAT_2021_AWS_Migration_0921 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# ecom-repository
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-ecom-repository-development --stack-name pipeline-ecom-repository-development --parameter-overrides pRepo=ecom-repository pBranch=FEAT_2021_AWS_Migration_0921 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2





# ecom-business-service
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-ecom-business-service-development --stack-name pipeline-ecom-business-service --parameter-overrides pRepo=ecom-business-service pBranch=FEAT_2021_AWS_Migration_0921 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# tools-business-service
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-tools-business-service --stack-name pipeline-repo-tools-business-service --parameter-overrides pRepo=tools-business-service pBranch=FEAT_2021_AWS_Migration_0921 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# ecom-web
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-ecom-web --stack-name pipeline-ecom-web --parameter-overrides pRepo=ecom-web pBranch=FEAT_2022_AWS_Migration_0720 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# ecom-checkout
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-ecom-checkout --stack-name pipeline-ecom-checkout --parameter-overrides pRepo=ecom-checkout pBranch=FEAT_2022_AWS_Migration_0720 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2

# oms-cache-service
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-oms-cache-service --stack-name pipeline-oms-cache-service --parameter-overrides pRepo=oms-cache-service pBranch=FEAT_2022_AWS_MIGRATION_1010 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2
```

Assets & Fun365 Build Project
To validate the template:
```shell
aws cloudformation validate-template --template-body file://pipeline-template-assets.yaml --profile ortc-ecom-shared --region us-west-2
```

To package the template:
```shell
aws cloudformation package --template-file pipeline-template-assets.yaml --s3-bucket 969702943927-cf-stacks --output-template-file packaged.yaml --profile ortc-ecom-shared --region us-west-2
```

To Deploy the Template:
```shell
# Assets
# Fun365
aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-assets-fun365 --stack-name pipeline-assets-fun365 --parameter-overrides pRepo=assets pRepoSecond=fun365 pBranch=PRODUCTION --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2
```



```shell
# POC1
# Deploy from S3 test for cache-service while it's in SVN
aws cloudformation validate-template --template-body file://pipeline-template-s3.yaml --profile ortc-ecom-shared --region us-west-2

aws cloudformation package --template-file pipeline-template-s3.yaml --s3-bucket 969702943927-cf-stacks --output-template-file packaged.yaml --profile ortc-ecom-shared --region us-west-2

aws cloudformation deploy --template-file packaged.yaml --s3-bucket 969702943927-cf-stacks --s3-prefix pipeline-otc-cache-service-development --stack-name pipeline-otc-cache-service-development --parameter-overrides pRepo=otc-cache-service pBranch=Developer_DSimmon_Opti9 --capabilities CAPABILITY_NAMED_IAM --profile ortc-ecom-shared --region us-west-2
```