# Part 3 - Service broker integration

## Tutorial Flow

In this tutorial, we will go through the following flow:

## Steps

### Provision a MySQL instance using Service Broker

Provision a PVC / PV / OCI Block Volume
$ kubectl apply -f mysql-pvc.yaml

persistentvolumeclaim "mysql-pvc-01" created


Check the PVC from the Kubernetes Dashboard
![](/images/sb-mysql-pvc.png)

Check the PV from the Kubernetes Dashboard
![](/images/sb-mysql-pv.png)

Check the Block Volume from the OCI console
![](/images/sb-mysql-oci-block-volumes.png)


Provisioner logs 

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


Admin screenshot 1 

Admin screenshot 2


### Write code to connect microservice version V2 to the MongoDB instance

### Access GET "/api/creditscore" (in a Browser or in Postman)

### Observe the microservice behaviour (in Vizceral, Zipkin, Grafana)

