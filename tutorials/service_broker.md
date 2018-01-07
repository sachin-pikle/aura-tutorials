# Part 3 - Service broker integration

## Tutorial Flow

In this tutorial, we will go through the following flow:

* Provision a MySQL instance using Service Broker
* Write code to connect microservice version V2 to the MySQL instance
* Access GET "/api/creditscore" (in a Browser or in Postman)
* Observe the microservice behaviour (in Vizceral, Zipkin, Grafana)

## Steps

### Provision a MySQL instance using Service Broker

1. Provision a PVC / PV / OCI Block Volume

    $ kubectl apply -f mysql-pvc.yaml  
    persistentvolumeclaim "mysql-pvc-01" created


2. Check the PVC from the Kubernetes Dashboard
![Persistent Volume Claim](images/sb-mysql-pvc.png)

3. Check the PV from the Kubernetes Dashboard
![Persistent Volume](images/sb-mysql-pv.png)

4. Check the Block Volume from the OCI console
![Block Volume](images/sb-mysql-oci-block-volumes.png)


5. Check the Volume Provisioner logs 

    I0106 17:29:22.224399       1 controller.go:893] scheduleOperation[lock-provision-default/mysql-pvc-01[223367d8-f307-11e7-92b2-0a580aed6036]]
    
    I0106 17:29:22.232035       1 controller.go:893] scheduleOperation[lock-provision-default/mysql-pvc-01[223367d8-f307-11e7-92b2-0a580aed6036]]
    
    I0106 17:29:22.246731       1 leaderelection.go:154] attempting to acquire leader lease...
    
    I0106 17:29:22.258656       1 leaderelection.go:176] successfully acquired lease to provision for pvc default/mysql-pvc-01
    
    I0106 17:29:22.258699       1 controller.go:893] scheduleOperation[provision-default/mysql-pvc-01[223367d8-f307-11e7-92b2-0a580aed6036]]
    
    I0106 17:29:22.262405       1 provisioner.go:143] VolumeOptions.PVC.Spec.Selector v1.LabelSelector{MatchLabels:map[string]string{"oci-availability-domain":"US-ASHBURN-AD-1"}, MatchExpressions:[]v1.LabelSelectorRequirement(nil)}
    
    I0106 17:29:22.262463       1 provisioner.go:147] 'CompartmentID' not given. Using compartment OCID ocid1.compartment.oc1..aaaaaaaau3ons3c5upigy7upbroba64jfdaawz6phcs45qwocdat5qh22lqq from instance metadata
    
    I0106 17:29:22.287593       1 provisioner.go:166] Volume size 53687091200
    
    I0106 17:29:22.287612       1 provisioner.go:170] Creating volume size=51200 AD=mmXc:US-ASHBURN-AD-1 compartmentOCID="ocid1.compartment.oc1..aaaaaaaau3ons3c5upigy7upbroba64jfdaawz6phcs45qwocdat5qh22lqq"
    
    I0106 17:29:22.411558       1 controller.go:627] volume "abuwcljsaawe4p22kmypedlm63iunro5vq4wfmhh3jl4253fd4vpz4n6tlea" for claim "default/mysql-pvc-01" created
    
    I0106 17:29:22.420505       1 controller.go:644] volume "abuwcljsaawe4p22kmypedlm63iunro5vq4wfmhh3jl4253fd4vpz4n6tlea" for claim "default/mysql-pvc-01" saved
    
    I0106 17:29:22.420531       1 controller.go:680] volume "abuwcljsaawe4p22kmypedlm63iunro5vq4wfmhh3jl4253fd4vpz4n6tlea" provisioned for claim "default/mysql-pvc-01"
    
    I0106 17:29:24.268605       1 leaderelection.go:196] stopped trying to renew lease to provision for pvc default/mysql-pvc-01, task succeeded


5. Go to Admin console > [Service Brokers](http://127.0.0.1:8001/api/v1/namespaces/default/services/aura-admin-service:admin-service/proxy/console/#/serviceBrokers) 

![Service Brokers](images/sb-list-pre.png)


6. Select MySQL


7. Create a new MySQL SB Instance with the following values

Instance Name: mysql-sb-inst-1

Plan: basic

Parameters: 

Name: persistence.existingClaim

Value: mysql-pvc-01  ... This is the name of the PVC we created above

![Create Instance](images/sb-mysql-create.png)


8. MySQL SB instance created 

![Instance Created](images/sb-mysql-created.png)


9. Service Brokers home

![Service Brokers](images/sb-list-post.png)


10. Search "sb-inst" from the K8s dashboard

![MySQL Service Broker K8s Elements](images/sb-mysql-sb-inst-01-k8s-dashboard-1.png)

![MySQL Service Broker K8s Elements](images/sb-mysql-sb-inst-01-k8s-dashboard-2.png)

11. OCI Dashboard you will see the block volume attached to an OCI instance

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

1. Access GET /api/creditscore in a browser and see the response

Add screenshot

2. (OPTIONAL) Access GET /api/creditscore in Postman and see the response

Add screenshot


### Observe the microservice behaviour (in Vizceral, Zipkin, Grafana)

1. Check the pod logs

Add screenshot

2. Access Vizceral console (Limited for now - e.g. MySQL not visible currently, on the roadmap)

Add screenshot

3. Access Grafana dashboard (Limited for now - e.g. MySQL not visible currently, on the roadmap)

Add screenshot

4. Access Zipkin and Find the last 10, sort by Newest first (Limited for now - e.g. MySQL not visible currently, on the roadmap)

Add screenshot

5. Explore trace (Limited for now - e.g. MySQL not visible currently, on the roadmap)

Add screenshot


