package com.tarunkumar.loadbalancer.service.weightedroundrobin;

import com.tarunkumar.loadbalancer.service.LoadBalancerService;
import com.tarunkumar.loadbalancer.util.Server;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("weightedroundrobin")
public class WeightedRoundRobinService implements LoadBalancerService {

    private int noOfServers;
    private List<Server> serverList;
    private List<Integer> weights;       // Actual server weights
    private List<Integer> counters;      // Dynamic counters for weights
    private int totalWeight;
    private int currentIndex;

    @Override
    public void initializeServers(int noOfServers) {
        List<Integer> defaultWeights = new ArrayList<>();
        for (int i = 0; i < noOfServers; i++) {
            defaultWeights.add(1); // Default weight of 1 for all servers
        }
        initializeServers(noOfServers, defaultWeights);
    }

    public void initializeServers(int noOfServers, List<Integer> weights) {
        if (weights.size() != noOfServers) {
            throw new IllegalArgumentException("Number of weights must match the number of servers.");
        }
        for(int i: weights){
            System.out.println(i);
        }
        this.noOfServers = noOfServers;
        this.serverList = new ArrayList<>();
        this.weights = new ArrayList<>(weights);
        this.counters = new ArrayList<>();
        this.currentIndex = 0;

        int sum = 0;
        for (int i = 0; i < noOfServers; i++) {
            int weight = weights.get(i);
            serverList.add(new Server(i + 1, weight));
            System.out.println("adding " + weight);
            counters.add(0);
            sum += weight;
        }
        this.totalWeight = sum;
    }

    @Override
    public int handleRequest() {
        if (noOfServers == 0) {
            System.out.println("No servers available to handle the request.");
            return -1;
        }

        int attempts = 0;
        while (attempts < totalWeight) {
            // If current server has reached its assigned weight, move to the next one
            if (counters.get(currentIndex) < weights.get(currentIndex)) {
                Server server = serverList.get(currentIndex);

                if (server.getWeight() > server.getActiveConnections()) {
                    counters.set(currentIndex, counters.get(currentIndex) + 1);
                    return server.assignRequest();
                }
            }

            currentIndex = (currentIndex + 1) % noOfServers;
            attempts++;

            // Reset all counters if we've looped over totalWeight times
            if (attempts == totalWeight) {
                for (int i = 0; i < counters.size(); i++) {
                    counters.set(i, 0);
                }
            }
        }

        System.out.println("All servers are at full capacity.");
        return -1;
    }
}
