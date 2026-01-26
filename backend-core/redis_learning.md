# Redis learning:
i would not have learned it but i actually need it in my project, so i learnt it, if you are reading this, continue cuz the points i am gonna write might help you
understand redis in simple way

## What is redis?

- Redis is in-memory data-store, in simple words if you are in tech it is just a cache-thingy for our applications to use
- it is also a key-value store NoSQL Database
- key is a string and value can be pretty much anything
- again it is in memory first
- it is single threaded (except when durability is enabled)
- redis is persistent

### Optional Durability:

- so as it is an in-memory database(basically cache) one of the issue you might think that the data may be volatile just like RAM, like when we close the system or if it
crashes then boom the data from the cache is gone, but redis has a solution and service for it.
- durability means "once i say the write is done , the data will survive crashes, power loss, bad days"
- in redis durability is choice for the users as redis mainly focusus in speed/latency
- we have snapshots in redis like * RDB snapshots (occasionally saves the data to the disk) * AOF(append only file) Every write is logged

### Transport Protocol:
 
- it uses TCP = Transmission control protocol
- request/reponse model (just like HTTP)
- the message format is RESP (redis serialization protocol - you can look up on the internet)

### Pub/Sub:

- Publish–Subscribe is a messaging pattern where:
- Publishers send messages to a channel
- Subscribers listen to that channel
- Publishers and subscribers do not know each other
- Messages are delivered only to whoever is listening right now

### Replication/Clustering:

- Replication - one leader many followers model (master-slave)
- Clustering - shared data across multiple nodes
- Hybrid - both Replication and clustering


# You can try redis by spinning up redis docker instance - follow the official docs from here





