//
// This file generated by rdl 1.5.2. Do not modify!
//

package com.yahoo.athenz.msd;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import com.yahoo.rdl.*;

//
// NetworkPolicyChangeImpactRequest - struct representing input details for
// evaluating network policies change impact on transport policies
//
@JsonIgnoreProperties(ignoreUnknown = true)
public class NetworkPolicyChangeImpactRequest {
    public List<IPBlock> from;
    public List<IPBlock> to;
    public List<NetworkPolicyPort> sourcePorts;
    public List<NetworkPolicyPort> destinationPorts;

    public NetworkPolicyChangeImpactRequest setFrom(List<IPBlock> from) {
        this.from = from;
        return this;
    }
    public List<IPBlock> getFrom() {
        return from;
    }
    public NetworkPolicyChangeImpactRequest setTo(List<IPBlock> to) {
        this.to = to;
        return this;
    }
    public List<IPBlock> getTo() {
        return to;
    }
    public NetworkPolicyChangeImpactRequest setSourcePorts(List<NetworkPolicyPort> sourcePorts) {
        this.sourcePorts = sourcePorts;
        return this;
    }
    public List<NetworkPolicyPort> getSourcePorts() {
        return sourcePorts;
    }
    public NetworkPolicyChangeImpactRequest setDestinationPorts(List<NetworkPolicyPort> destinationPorts) {
        this.destinationPorts = destinationPorts;
        return this;
    }
    public List<NetworkPolicyPort> getDestinationPorts() {
        return destinationPorts;
    }

    @Override
    public boolean equals(Object another) {
        if (this != another) {
            if (another == null || another.getClass() != NetworkPolicyChangeImpactRequest.class) {
                return false;
            }
            NetworkPolicyChangeImpactRequest a = (NetworkPolicyChangeImpactRequest) another;
            if (from == null ? a.from != null : !from.equals(a.from)) {
                return false;
            }
            if (to == null ? a.to != null : !to.equals(a.to)) {
                return false;
            }
            if (sourcePorts == null ? a.sourcePorts != null : !sourcePorts.equals(a.sourcePorts)) {
                return false;
            }
            if (destinationPorts == null ? a.destinationPorts != null : !destinationPorts.equals(a.destinationPorts)) {
                return false;
            }
        }
        return true;
    }
}
