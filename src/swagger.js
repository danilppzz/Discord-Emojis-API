export const swaggerOptions = {
    swaggerDefinition: {
      "openapi": "3.0.3",
      "info": {
        "title": "danilppzz - Discord Emojis API",
        "description": "This is the documentation of Discord Emojis API.",
        "termsOfService": "http://localhost:3000/terms/",
        "contact": {
          "email": "contact@danilppzz.dev",
        },
        "license": {
          "name": "Apache 2.0",
          "url": "http://www.apache.org/licenses/LICENSE-2.0.html",
        },
        "version": "1.0.1",
      },
      "servers": [
        {
          "url": "https",
        },
      ],
      "externalDocs": {
        "description": "Find out more about Discord Emojis API",
        "url": "http://localhost:3000/",
      },
    },
    apis: ['./src/router.yaml'],
};