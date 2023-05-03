const apiDoc = {
  swagger: "2.0",
  info: {
    title: "Testpersonbokaren API-spec",
    version: "1.0.0",
  },
 
  paths: {
    '/persons': {
      get: {
        tags: ['persons'],
        summary: "Get all testpersons",
        operationId: "getAllTestpersons",
        responses: {
          200: {
            description: "Successful operation",
            schema: {
              type: 'object',
              properties: {
                testpersonId: {
                  type: 'string',
                  description: 'Personal identification number',
                  example: '189001019802'
                },
                isBooked: {
                  type: 'string',
                  description: '"Ja" if the testperson is booked, "Nej" otherwise',
                  example: 'Ja'
                },
                bookingUserId: {
                  type: 'string',
                  description: 'User identification number',
                  example: '1'
                },
                bookingUserFullName: {
                  type: 'string',
                  description: 'User full name',
                  example: 'Nordic Medtest'
                },
              
              }
            },
          },
        },
      },
      post:{
        tags: ['persons'],
        summary: "Book a testperson",
        operationId: "bookTestperson",
        consumes: ["application/json"],
        parameters: [{
          in: "body",
          name: "testpersons",
          schema: {
            type: 'string',
            description: 'Personal identification number',
            example: '189001019802'
          },
        },
        {
          in: "body",
          name: "userId",
          schema: {
            type: 'string',
            description: 'User identification number',
            example: '1'
          },
        },
        {
          in: "body",
          name: "logRef",
          schema: {
            type: 'string',
            description: 'The booker´s info',
            example: 'Madian Al Sabbagh, madian.alsabbagh@nordicmedtest.se'
          },
        },
        ],
        responses: {
          201: {
            description: "Successful operation",
          },
        },
      }
      },
    '/bookings':{
      get:{
      tags: ['bookings'],
      summary: "Get all bookings",
      operationId: "getAllBookings",
      responses: {
        200: {
        description: "Successful operation",
        schema: {
            type: 'object',
            properties: {
              bookingId: {
                type: 'string',
                description: 'Booking ID',
                example: '1'
              },
              userId: {
                type: 'string',
                description: 'User identification number',
                example: '5'
              },
              bookingLogRef: {
                type: 'string',
                description: 'The booker´s info',
                example: 'Madian Al Sabbagh, madian.alsabbagh@nordicmedtest.se'
              },
              ownerName: {
                type: 'string',
                description: 'User full name',
                example: 'Nordic Medtest'
              },
              testpersonId:{
                type: 'string',
                description: 'Personal identification number',
                example: '189001019802'
              },
              bookingTime:{
                type: 'string',
                description: 'Booking time',
                example: '2023-04-25T10:30:00.000Z'
              }
              
            }
      }
    }
  }
},
    put:{
      tags: ['bookings'],
      summary: "Update a booking",
      operationId: "UpdateBooking",
      parameters: [
        {
          in: "body",
          name: "testpersons",
          schema: {
            type: 'string',
            description: 'Personal identification number',
            example: '189001019802'
          },
        },
        {
          in: "body",
          name: "userId",
          schema: {
            type: 'string',
            description: 'User identification number',
            example: '1'
          },
        },
        {
          in: "body",
          name: "logRef",
          schema: {
            type: 'string',
            description: 'The booker´s info',
            example: 'Madian Al Sabbagh, madian.alsabbagh@nordicmedtest.se'
          },
        },
      ],
      responses: {
        201: {
        description: "Successful operation"
}
}
    }

    },
  '/bookings/{id}': {
    delete: {
      tags: ['bookings'],
      summary: "Delete a booking with a specific testpersonId",
      operationId: "deleteBooking",
      parameters: [
        {
          in: "path",
          name: "testpersonId",
          description: 'Personal identification number',
          schema: {
            type: 'string',
            example: '189001019802'
          }
        }],
      responses: {
        200: {
          description: "Successful operation"
        }
      }
    }
    },
'/search/{id}': {
  get: {
    tags: ['search'],
    summary: "Find testpersons by testpersonId",
    operationId: "findTestperonsByTestperosnId",
    parameters: [
      {
        in: "path",
        name: "testpersonId",
        description: 'Personal identification number',
        schema: {
          type: 'string',
          example: '189001019802'
        },
      },],
    responses: {
      200: {
        description: "Successful operation",
        schema: {
          type: 'object',
          properties: {
            testpersonId: {
              type: 'string',
              description: 'Personal identification number',
              example: '189001019802'
            },
            isBooked: {
              type: 'string',
              description: '"Ja" if the testperson is booked, "Nej" otherwise',
              example: 'Nej'
            },
          
            bookingUserId: {
              type: 'string',
              description: 'User identification number',
              example: ''
            },
            bookingUserFullName: {
              type: 'string',
              description: 'User full name',
              example: ''
            },
          
          }
        },
      },
    },
  }  
  },
  '/search/bookings/{id}': {
    get: {
      tags: ['search'],
      summary: "Find bookings by testpersonId",
      operationId: "findBookingsByTestpersonId",
      parameters: [
        {
          in: "path",
          name: "testpersonId",
          description: 'Personal identification number',
          schema: {
            type: 'string',
            example: '189001019802'
          },
        },],
      responses: {
        200: {
          description: "Successful operation",
          schema: {
            type: 'object',
            properties: {
              testpersonId: {
                type: 'string',
                description: 'Personal identification number',
                example: '189001019802'
              },
              bookingId: {
                type: 'string',
                description: 'Booking ID',
                example: '5'
              },
              bookingTime:{
                type: 'string',
                description: 'Booking time',
                example: '2023-04-25T10:30:00.000Z'
              },
              userId: {
                type: 'string',
                description: 'User identification number',
                example: '1'
              },
              bookingUserFullName: {
                type: 'string',
                description: 'User full name',
                example: 'Nordic Medtest'
              },
            
            }
          },
        },
      },
    }
    
    },
  '/search/basedOnGroup/{id}': {
    get: {
      tags: ['search'],
      summary: "Find bookings by testpersonId",
      operationId: "findBookingsByTestpersonId",
      parameters: [
        {
          in: "path",
          name: "groupId",
          description: 'Group ID',
          schema: {
            type: 'string',
            example: '1'
          },
        },],
      responses: {
        200: {
          description: "Successful operation",
          schema: {
            type: 'object',
            properties: {
              testpersonId: {
                type: 'string',
                description: 'Personal identification number',
                example: '189001019802'
              },
              bookingId: {
                type: 'string',
                description: 'Booking ID',
                example: '5'
              },
              bookingTime:{
                type: 'string',
                description: 'Booking time',
                example: '2023-04-25T10:30:00.000Z'
              },
              userId: {
                type: 'string',
                description: 'User identification number',
                example: '3'
              },
              shortName: {
                type: 'string',
                description: 'User short number',
                example: 'TA'
              },
              bookingUserFullName: {
                type: 'string',
                description: 'User full name',
                example: 'Testanvändare'
              },
              group: {
                type: 'string',
                description: 'Group name',
                example: 'Nordic Medtest (NMT)'
              },
            }
          },
        },
      },
    }  
    },
    '/search/ageSpan/{min}/{max}': {
      get: {
        tags: ['search'],
        summary: "Find bookings by testpersonId",
        operationId: "findBookingsByTestpersonId",
        parameters: [
          {
            in: "path",
            name: "min",
            description: 'Minimum age',
            schema: {
              type: 'string',
              example: '13'
            },
          },
          {
            in: "path",
            name: "max",
            description: 'Maximum age',
            schema: {
              type: 'string',
              example: '15'
            },
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            schema: {
              type: 'object',
              properties: {
                testpersonId: {
                  type: 'string',
                  description: 'Personal identification number',
                  example: '200704272384'
                },
                isBooked: {
                  type: 'string',
                  description: '"Ja" if the testperson is booked, "Nej" otherwise',
                  example: 'Nej'
                },
              
                bookingUserId: {
                  type: 'string',
                  description: 'User identification number',
                  example: ''
                },
                bookingUserFullName: {
                  type: 'string',
                  description: 'User full name',
                  example: ''
                }
              }
            },
          },
        },
      }  
      },
      '/search/birthYear/{min}/{max}': {
        get: {
          tags: ['search'],
          summary: "Find bookings by testpersonId",
          operationId: "findBookingsByTestpersonId",
          parameters: [
            {
              in: "path",
              name: "min",
              description: 'Minimum year',
              schema: {
                type: 'string',
                example: '1960'
              },
            },
            {
              in: "path",
              name: "max",
              description: 'Maximum year',
              schema: {
                type: 'string',
                example: '1975'
              },
            },
          ],
          responses: {
            200: {
              description: "Successful operation",
              schema: {
                type: 'object',
                properties: {
                  testpersonId: {
                    type: 'string',
                    description: 'Personal identification number',
                    example: '196409053086'
                  },
                  isBooked: {
                    type: 'string',
                    description: '"Ja" if the testperson is booked, "Nej" otherwise',
                    example: 'Nej'
                  },
                
                  bookingUserId: {
                    type: 'string',
                    description: 'User identification number',
                    example: ''
                  },
                  bookingUserFullName: {
                    type: 'string',
                    description: 'User full name',
                    example: ''
                  }
                }
              },
            },
          },
        }  
        },
        '/groups': {
          get: {
            tags: ['groups'],
            summary: "Get all groups",
            operationId: "getAllGroups",
            responses: {
              200: {
                description: "Successful operation",
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      description: 'Group ID',
                      example: '1'
                    },
                    group: {
                      type: 'string',
                      description: 'Group short name',
                      example: 'NMT'
                    },
                    groupName:{
                      type: 'string',
                      description: 'Group full name',
                      example: 'Nordic Medtest'
                    }
                  }
                },
              },
            },
            },
            put: {
              tags: ['groups'],
              summary: "Update group",
              operationId: "updateGroup",
              parameters: [{
                in: "body",
                name: "fullname",
                schema: {
                  type: 'string',
                  description: 'Group full name',
                  example: 'Nordic Medtest'
                },
              },
              {
                in: "body",
                name: "shortName",
                schema: {
                  type: 'string',
                  description: 'Group short name',
                  example: 'NMT'
                },
              },
              {
                in: "body",
                name: "groudId",
                schema: {
                  type: 'string',
                  description: 'Group ID',
                  example: '1'
                },
              },
              ],
              responses: {
                200: {
                  description: "Successful operation",
                },
              },
              },

              post: {
                tags: ['groups'],
                summary: "Add new group",
                operationId: "addGroup",
                parameters: [{
                  in: "body",
                  name: "fullname",
                  schema: {
                    type: 'string',
                    description: 'Group full name',
                    example: 'Nordic Medtest'
                  },
                },
                {
                  in: "body",
                  name: "shortName",
                  schema: {
                    type: 'string',
                    description: 'Group short name',
                    example: 'NMT'
                  },
                },
                ],
                responses: {
                  200: {
                    description: "Successful operation",
                  },
                },
                },
          },

          '/groups/{id}': {
            get: {
              tags: ['groups'],
              summary: "Get a group based on groupId",
              operationId: "getGroupBasedOnId",
              parameters: [{
                in: "path",
                name: "groupId",
                description: 'Group ID',
                schema: {
                  type: 'string',
                  description: 'Group ID',
                  example: '1'
                },
              },
              ],
              responses: {
                200: {
                  description: "Successful operation",
                  schema: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        description: 'Group ID',
                        example: '1'
                      },
                      group: {
                        type: 'string',
                        description: 'Group short name',
                        example: 'NMT'
                      },
                      groupName:{
                        type: 'string',
                        description: 'Group full name',
                        example: 'Nordic Medtest'
                      }
                    }
                  },
                },
              },
              },

            },
            '/groups/delete/{id}': {
              delete: {
                tags: ['groups'],
                summary: "Delete a group, its users and their bookings",
                operationId: "deleteGroup",
                parameters: [{
                  in: "path",
                  name: "groupId",
                  description: 'Group ID',
                  schema: {
                    type: 'string',
                    example: '1'
                  },
                },
                ],
                responses: {
                  200: {
                    description: "Successful operation",
                  },
                },
                },
  
              },
              '/users': {
                get: {
                  tags: ['users'],
                  summary: "Get all users",
                  operationId: "getAllUsers",
                  responses: {
                    200: {
                      description: "Successful operation",
                      schema: {
                        type: 'object',
                        properties: {
                          userId: {
                            type: 'string',
                            description: 'User ID',
                            example: '1'
                          },
                          shortNme: {
                            type: 'string',
                            description: 'User short name',
                            example: 'TA'
                          },
                          fullName:{
                            type: 'string',
                            description: 'User full name',
                            example: 'Testanvändare'
                          },
                          group:{
                            type: 'string',
                            description: 'Group short name',
                            example: 'NMT'
                          },
                          groupName:{
                            type: 'string',
                            description: 'Group full name',
                            example: 'Nordic Medtest'
                          }
                        }
                      },
                    },
                  },
                  },
                  put: {
                    tags: ['users'],
                    summary: "Update user",
                    operationId: "updateUser",
                    parameters: [{
                      in: "body",
                      name: "fullname",
                      schema: {
                        type: 'string',
                        description: 'User full name',
                        example: 'Testanvändare'
                      },
                    },
                    {
                      in: "body",
                      name: "shortName",
                      schema: {
                        type: 'string',
                        description: 'User short name',
                        example: 'TA'
                      },
                    },
                    {
                      in: "body",
                      name: "userId",
                      schema: {
                        type: 'string',
                        description: 'User ID',
                        example: '3'
                      },
                    },
                    {
                      in: "body",
                      name: "groudId",
                      schema: {
                        type: 'string',
                        description: 'Group ID',
                        example: '1'
                      },
                    },
                    ],
                    responses: {
                      200: {
                        description: "Successful operation",
                      },
                    },
                    },
      
                    post: {
                      tags: ['users'],
                      summary: "Add new user",
                      operationId: "addUser",
                      parameters: [{
                        in: "body",
                        name: "fullname",
                        schema: {
                          type: 'string',
                          description: 'User full name',
                          example: 'Testanvändare'
                        },
                      },
                      {
                        in: "body",
                        name: "shortName",
                        schema: {
                          type: 'string',
                          description: 'User short name',
                          example: 'TA'
                        },
                      },
                      {
                        in: "body",
                        name: "userId",
                        schema: {
                          type: 'string',
                          description: 'User ID',
                          example: '3'
                        },
                      },
                      {
                        in: "body",
                        name: "groud",
                        schema: {
                          type: 'string',
                          description: 'Group short name',
                          example: 'NMT'
                        },
                      },
                      ],
                      responses: {
                        200: {
                          description: "Successful operation",
                        },
                      },
                      },
                },
      
                '/users/{id}': {
                  get: {
                    tags: ['users'],
                    summary: "Get a user based on userId",
                    operationId: "getUserBasedOnUserId",
                    parameters: [{
                      in: "path",
                      name: "userId",
                      description: 'User ID',
                      schema: {
                        type: 'string',
                        example: '3'
                      },
                    },
                    ],
                    responses: {
                      200: {
                        description: "Successful operation",
                        schema: {
                          type: 'object',
                          properties: {
                            userId: {
                              type: 'string',
                              description: 'User ID',
                              example: '3'
                            },
                            shortNme: {
                              type: 'string',
                              description: 'User short name',
                              example: 'TA'
                            },
                            fullName:{
                              type: 'string',
                              description: 'User full name',
                              example: 'Testanvändare'
                            },
                            group: {
                              type: 'string',
                              description: 'Group short name',
                              example: 'NMT'
                            },
                            groupName:{
                              type: 'string',
                              description: 'Group full name',
                              example: 'Nordic Medtest'
                            }
                          }
                        },
                      },
                    },
                    },
      
                  },
                  '/users/delete/{id}': {
                    delete: {
                      tags: ['users'],
                      summary: "Delete a user and its bookings",
                      operationId: "deleteGroup",
                      parameters: [{
                        in: "path",
                        name: "userId",
                        description: 'User ID',
                        schema: {
                          type: 'string',
                          example: '3'
                        },
                      },
                      ],
                      responses: {
                        200: {
                          description: "Successful operation",
                        },
                      },
                      },
        
                    },
              

  },
  
};
module.exports = apiDoc;
