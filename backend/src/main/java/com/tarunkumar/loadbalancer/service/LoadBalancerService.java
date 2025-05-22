package com.tarunkumar.loadbalancer.service;

public interface LoadBalancerService {
    void initializeServers(int noOfServers);
    int handleRequest();
}
