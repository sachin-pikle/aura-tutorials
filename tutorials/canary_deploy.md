# Part 2 - Canary deployment

## Tutorial Flow

In this tutorial, we will go through the following flow:

* Deploy microservice version V2 with Istio enabled (using Wercker)
* Access GET "/api/creditscore" (in a Browser or in Postman)
* See the traffic distribution between versions V1 and V2
* Route 100% traffic to microservice version V2
* Observe the microservice behaviour (in Vizceral, Zipkin, Grafana)

## Steps

### Deploy microservice version V2 with Istio enabled (using Wercker)

1. Set up the source code repo

We will use an existing application for this tutorial.

1.1. Sign in to your GitHub page, and wercker account

1.2. Go to Sachin's GitHub repo [V2]() and fork it. You now have your own working copy of the repo V1

2. Set up the wercker CI/CD

2.1. Add application

2.2. Review the wercker.yml file

2.3. Set up pipelines

2.4. Set up the workflow

3. Deploy the app using wercker CI/CD

3.1. Go to [V1 > creditscore.js]()

3.2. Change title - add V1 

3.3. Commit the change

3.4. Wercker will fire the CI/CD workflow for V1. Check the progress on Wercker Pipelines > Runs.

Add screenshot

3.5. Check Releases to confirm the new container image has been uploaded

Add screenshot

3.6. Check the Kubernetes dashboard to see if the latest version got deployed. Takes ~35 seconds for K8s to terminate the old pods and start the new pod

Add screenshot

3.7. Check the pod logs

Add screenshot

### Access GET "/api/creditscore" (in a Browser or in Postman)

1. Access GET /api/creditscore in a browser and see the response

Add screenshot

2. (OPTIONAL) Access GET /api/creditscore in Postman and see the response

Add screenshot

### See the traffic distribution between versions V1 and V2

You will notice some requests are served by V1 and others by V2 

### Route 100% traffic to microservice version V2

1. Run the Istio command to route 100% of the traffic to V2

2. Access the api and confirm requests are served by V2 only

### Observe the microservice behaviour (in Vizceral, Zipkin, Grafana)


1. Check the pod logs

Add screenshot

2. Access Vizceral console (Limited for now)

Add screenshot

3. Access Grafana dashboard (Limited for now)

Add screenshot

4. Access Zipkin and Find the last 10, sort by Newest first (Limited for now)

Add screenshot

5. Explore trace (Limited for now)

Add screenshot

