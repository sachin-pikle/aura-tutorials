# Part 3 - Service broker integration

## Tutorial Flow

In this tutorial, we will go through the following flow:

* Provision a MySQL instance using Service Broker
* Write code to connect microservice version V2 to the MySQL instance
* Access GET "/api/creditscore" (in a Browser or in Postman)
* Observe the microservice behaviour (in Vizceral, Zipkin, Grafana)

## Steps

### Provision a MySQL instance using Service Broker

1. Provision a Persistent Volume Claim (PVC) / Persistent Volume (PV) / OCI Block Volume using aura-js-creditscore-v2 > mysql-pvc.yaml. 

    $ kubectl apply -f mysql-pvc.yaml  
    persistentvolumeclaim "mysql-pvc-01" created


2. Check the PVC from the Kubernetes Dashboard

![Persistent Volume Claim](images/sb-mysql-pvc.png)

3. Check the PV from the Kubernetes Dashboard

![Persistent Volume](images/sb-mysql-pv.png)

4. Check the Block Volume from the OCI console

![Block Volume](images/sb-mysql-oci-block-volumes.png)

5. Check the Volume Provisioner logs 

![Volume Provisioner Logs](images/sb-mysql-volume-provisioner-logs.png)


6. Go to Admin console > Service Brokers

URL: http://127.0.0.1:8001/api/v1/namespaces/default/services/aura-admin-service:admin-service/proxy/console/#/serviceBrokers 

![Service Brokers](images/sb-list-pre.png)


7. Select MySQL (thirdparty-mysql-service)


8. Create New Instance of the MySQL service broker with the following values

Instance Name: mysql-sb-inst-1

Plan: basic

Parameters: 

Name: persistence.existingClaim

Value: mysql-pvc-01  ... This is the name of the PVC we created above

![Create Instance](images/sb-mysql-create.png)


9. MySQL service broker instance created 

![Instance Created](images/sb-mysql-created.png)


10. Service Brokers home page

![Service Brokers](images/sb-list-post.png)


11. Search "sb-inst" from the K8s dashboard

![MySQL Service Broker K8s Elements](images/sb-mysql-sb-inst-01-k8s-dashboard-1.png)

![MySQL Service Broker K8s Elements](images/sb-mysql-sb-inst-01-k8s-dashboard-2.png)


12. OCI Dashboard you will see the block volume attached to an OCI instance

![Block Volume](images/sb-mysql-oci-block-volumes-attached.png)



### Write code to connect microservice version V2 to the MySQL instance

1. Go to [V2 > creditscore.js]()

2. Uncomment code to connect to MYSQL

3. Commit the change

4. Wercker will fire the CI/CD workflow for V2. Check the progress on Wercker Pipelines > Runs.

Add screenshot

5. Check Releases to confirm the new container image has been uploaded

Add screenshot

6. Check the Kubernetes dashboard to see if the latest version got deployed. Takes ~35 seconds for K8s to terminate the old pods and start the new pod

Add screenshot

7. Check the pod logs

Add screenshot


### Access GET "/api/creditscore" (in a Browser or in Postman)

1. Access GET /api/creditscore in a browser multiple times and you should see the following message indicating successful DB communication

`{ "MESSAGE" : "SUCCESS communicating with DB" }`

![Access API in Browser](images/sb-mysql-api-access-browser-output.png)


2. (OPTIONAL) Access GET /api/creditscore in Postman multiple times and you should see the following message indicating successful DB communication

`{  
    "MESSAGE": "SUCCESS communicating with DB"  
}`

![Access API in Postman](images/sb-mysql-api-access-postman-output.png)


### Observe the microservice behaviour (in Vizceral, Zipkin, Grafana)

1. Check the pod logs

![Pod Logs](images/ms-pod-logs-v2.png)

2. Access Vizceral console (Limited visibility for now, more on the roadmap)

Known Issue: Screen shows the data flowing for ~1 minute. This view doesn't refresh automatically and must be refreshed manually by reloading the top level console

URL: http://127.0.0.1:8001/api/v1/namespaces/default/services/aura-admin-service:admin-service/proxy/console/#/vizceral

**a) Vizceral Console Top Level**

You will see traffic flowing from the internet in to your cluster. Note the service "aura-js-creditscore" pod is deployed in a single AD.

![Vizceral Console Level 1](images/ms-vizceral-level-1.png)

**b) Vizceral Console Next Level Drill Down**

Click on the circle next to "My Cluster". And you will see traffic flowing from the internet into your "aura-js-creditscore" service.

![Vizceral Console Level 2](images/ms-vizceral-level-2.png)

**b) Vizceral Console Service Details**

Click on the service circle named "aura-js-creditscore". And you will see additional details about your running aura-js-creditscore service

![Vizceral Console Level 3](images/ms-vizceral-level-3-v2.png)

3. Access Grafana dashboard (Limited visibility for now, more on the roadmap)

URL: http://127.0.0.1:8001/api/v1/namespaces/default/services/aura-admin-service:admin-service/proxy/console/#/grafana

![Grafana Part 1](images/ms-grafana-part-1.png)

![Grafana Part 2](images/ms-grafana-part-2.png)

4. Access Zipkin tracing (Limited visibility for now, more on the roadmap)

URL: http://127.0.0.1:8001/api/v1/namespaces/default/services/aura-admin-service:admin-service/proxy/console/#/zipkin

Find the last 10, sort by Newest first.

**a) Zipkin Tracing Top Level**

![Zipkin Level 1](images/ms-zipkin-level-1.png)

**b) Zipkin Tracing Second Level**

Explore trace by clicking on the first span

![Zipkin Level 2](images/ms-zipkin-level-2-v2.png)

**c) Zipkin Tracing Additional Details**

Get additional trace details by clicking on the first line of the span "aura-js-creditscore"

![Zipkin Level 3](images/ms-zipkin-level-3-v2.png)
