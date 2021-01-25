# newsgen-backend
Backend API for managing users and news.

## Technologies
* [Spring Boot](https://dotnet.microsoft.com/learn/aspnet/what-is-aspnet-core)
* Java
* Docker
* [AWS](https://aws.amazon.com/)
* [ClickUp](https://clickup.com/)

## Important Daily Routine
When working with the API again
* Create application load balancer 
    * Add HTTP and HTTPS load balancer protocol
    * availability zone: us-west-2b and us-west-2c
    * Choose a certificate from IAM: newsgen-backend
    * security group: newsge-1507
    * Existing target group: ecs-newsge-newsgen-backend
* Create task definition revision

When done
* Remove the load balancer
* Deregister newsgen-backend task definitions

## Create Self-Signed Certificate
Read this [blog](https://medium.com/@francisyzy/create-aws-elb-with-self-signed-ssl-cert-cd1c352331f) for creating your own self-signed certificate.

## Code Documentation Style
See [microsoft documentation](https://docs.microsoft.com/en-us/dotnet/csharp/codedoc)

## Deploy to AWS Fargate
See [this blog](https://medium.com/javascript-in-plain-english/deploy-your-node-app-to-aws-container-service-via-github-actions-build-a-pipeline-c114adeb8903)