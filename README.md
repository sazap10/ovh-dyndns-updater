#OVH DYNDNS Updater
Updates the dyndns field in ovh domain list with current ip address.

### Example docker-compose
```
updater:
  image: image: sazap10/ovh-dyndns-updater:latest
  environment:
    DOMAIN: [domain name]
    USERNAME: [DNS Host ID]
    PASSWORD: [DNS Host password]
```


