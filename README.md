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
    * availability zone: us-west-2b and us-west-2c
    * security group: newsge-1507
    * target group: ecs-newsge-newsgen-backend
* Create task definition revision

When done
* Remove the load balancer
* Deregister task definitions

## Code Documentation Style
See [microsoft documentation](https://docs.microsoft.com/en-us/dotnet/csharp/codedoc)

## Deploy to AWS Fargate
See [this blog](https://medium.com/javascript-in-plain-english/deploy-your-node-app-to-aws-container-service-via-github-actions-build-a-pipeline-c114adeb8903)