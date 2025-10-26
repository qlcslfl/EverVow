package com.example.evervow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.*;
import java.util.stream.Collectors;

@RestController
public class ActuatorMappingsController {

    @Autowired
    private Map<String, RequestMappingHandlerMapping> handlerMappings;

    @GetMapping("/actuator/mappings")
    public Map<String, Object> mappings() {
        Map<String, Object> result = new LinkedHashMap<>();

        // Prefer the standard requestMappingHandlerMapping bean if present
        RequestMappingHandlerMapping mapping = handlerMappings.get("requestMappingHandlerMapping");
        if (mapping == null) {
            // fallback: choose the first mapping that has handler methods
            for (RequestMappingHandlerMapping m : handlerMappings.values()) {
                if (m.getHandlerMethods() != null && !m.getHandlerMethods().isEmpty()) {
                    mapping = m;
                    break;
                }
            }
        }

        if (mapping == null) {
            result.put("mappings", Collections.emptyList());
            result.put("count", 0);
            return result;
        }

        Map<RequestMappingInfo, org.springframework.web.method.HandlerMethod> map = mapping.getHandlerMethods();

        List<Map<String, Object>> entries = map.entrySet().stream().map(e -> {
            RequestMappingInfo info = e.getKey();
            org.springframework.web.method.HandlerMethod hm = e.getValue();
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("patterns", info.getPatternValues());
            m.put("methods", info.getMethodsCondition().getMethods().stream().map(Object::toString).collect(Collectors.toList()));
            m.put("handler", hm.getBeanType().getName() + "#" + hm.getMethod().getName());
            return m;
        }).collect(Collectors.toList());

        result.put("mappings", entries);
        result.put("count", entries.size());
        return result;
    }
}
