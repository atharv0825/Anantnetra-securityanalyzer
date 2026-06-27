package com.anantnetra.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {

        return new OpenAPI()
                .info(
                        new Info()
                                .title("AnantNetra Security Analyzer API")
                                .version("1.0")
                                .description("AI-powered security finding analysis API")
                                .contact(
                                        new Contact()
                                                .name("Atharv Babar")
                                                .email("atharvbabar044@gmail.com")
                                )
                );
    }
}