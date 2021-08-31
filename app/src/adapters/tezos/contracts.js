const FA2_CODE_JSON = [
  {
    "prim": "storage",
    "args": [
      {
        "prim": "pair",
        "args": [
          {
            "prim": "pair",
            "args": [
              { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%administrator" ] }, { "prim": "nat", "annots": [ "%all_tokens" ] } ] },
              {
                "prim": "pair",
                "args": [
                  { "prim": "big_map", "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] }, { "prim": "nat" } ], "annots": [ "%ledger" ] },
                  { "prim": "big_map", "args": [ { "prim": "string" }, { "prim": "bytes" } ], "annots": [ "%metadata" ] }
                ]
              }
            ]
          },
          {
            "prim": "pair",
            "args": [
              {
                "prim": "pair",
                "args": [
                  {
                    "prim": "big_map",
                    "args": [
                      {
                        "prim": "pair",
                        "args": [
                          { "prim": "address", "annots": [ "%owner" ] },
                          { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%operator" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] }
                        ]
                      },
                      { "prim": "unit" }
                    ],
                    "annots": [ "%operators" ]
                  },
                  { "prim": "bool", "annots": [ "%paused" ] }
                ]
              },
              {
                "prim": "pair",
                "args": [
                  {
                    "prim": "big_map",
                    "args": [
                      { "prim": "nat" },
                      {
                        "prim": "pair",
                        "args": [
                          { "prim": "nat", "annots": [ "%token_id" ] },
                          { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ], "annots": [ "%token_info" ] }
                        ]
                      }
                    ],
                    "annots": [ "%token_metadata" ]
                  },
                  { "prim": "big_map", "args": [ { "prim": "nat" }, { "prim": "nat" } ], "annots": [ "%total_supply" ] }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "prim": "parameter",
    "args": [
      {
        "prim": "or",
        "args": [
          {
            "prim": "or",
            "args": [
              {
                "prim": "or",
                "args": [
                  {
                    "prim": "pair",
                    "args": [
                      {
                        "prim": "list",
                        "args": [ { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] } ],
                        "annots": [ "%requests" ]
                      },
                      {
                        "prim": "contract",
                        "args": [
                          {
                            "prim": "list",
                            "args": [
                              {
                                "prim": "pair",
                                "args": [
                                  {
                                    "prim": "pair",
                                    "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ],
                                    "annots": [ "%request" ]
                                  },
                                  { "prim": "nat", "annots": [ "%balance" ] }
                                ]
                              }
                            ]
                          }
                        ],
                        "annots": [ "%callback" ]
                      }
                    ],
                    "annots": [ "%balance_of" ]
                  },
                  {
                    "prim": "pair",
                    "args": [
                      { "prim": "address", "annots": [ "%from_" ] },
                      { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%to_" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] }
                    ],
                    "annots": [ "%buy" ]
                  }
                ]
              },
              {
                "prim": "or",
                "args": [
                  {
                    "prim": "pair",
                    "args": [
                      { "prim": "address", "annots": [ "%creator" ] },
                      {
                        "prim": "pair",
                        "args": [
                          { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ], "annots": [ "%metadata" ] },
                          { "prim": "nat", "annots": [ "%token_id" ] }
                        ]
                      }
                    ],
                    "annots": [ "%mint" ]
                  },
                  { "prim": "address", "annots": [ "%set_administrator" ] }
                ]
              }
            ]
          },
          {
            "prim": "or",
            "args": [
              {
                "prim": "or",
                "args": [
                  { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%k" ] }, { "prim": "bytes", "annots": [ "%v" ] } ], "annots": [ "%set_metadata" ] },
                  { "prim": "bool", "annots": [ "%set_pause" ] }
                ]
              },
              {
                "prim": "or",
                "args": [
                  {
                    "prim": "list",
                    "args": [
                      {
                        "prim": "pair",
                        "args": [
                          { "prim": "address", "annots": [ "%from_" ] },
                          {
                            "prim": "list",
                            "args": [
                              {
                                "prim": "pair",
                                "args": [
                                  { "prim": "address", "annots": [ "%to_" ] },
                                  { "prim": "pair", "args": [ { "prim": "nat", "annots": [ "%token_id" ] }, { "prim": "nat", "annots": [ "%amount" ] } ] }
                                ]
                              }
                            ],
                            "annots": [ "%txs" ]
                          }
                        ]
                      }
                    ],
                    "annots": [ "%transfer" ]
                  },
                  {
                    "prim": "list",
                    "args": [
                      {
                        "prim": "or",
                        "args": [
                          {
                            "prim": "pair",
                            "args": [
                              { "prim": "address", "annots": [ "%owner" ] },
                              { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%operator" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] }
                            ],
                            "annots": [ "%add_operator" ]
                          },
                          {
                            "prim": "pair",
                            "args": [
                              { "prim": "address", "annots": [ "%owner" ] },
                              { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%operator" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] }
                            ],
                            "annots": [ "%remove_operator" ]
                          }
                        ]
                      }
                    ],
                    "annots": [ "%update_operators" ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "prim": "code",
    "args": [
      [
        {
          "prim": "CAST",
          "args": [
            {
              "prim": "pair",
              "args": [
                {
                  "prim": "or",
                  "args": [
                    {
                      "prim": "or",
                      "args": [
                        {
                          "prim": "or",
                          "args": [
                            {
                              "prim": "pair",
                              "args": [
                                { "prim": "list", "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] } ] },
                                {
                                  "prim": "contract",
                                  "args": [
                                    {
                                      "prim": "list",
                                      "args": [ { "prim": "pair", "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] }, { "prim": "nat" } ] } ]
                                    }
                                  ]
                                }
                              ]
                            },
                            { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] } ] }
                          ]
                        },
                        {
                          "prim": "or",
                          "args": [
                            {
                              "prim": "pair",
                              "args": [
                                { "prim": "address" },
                                { "prim": "pair", "args": [ { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ] }, { "prim": "nat" } ] }
                              ]
                            },
                            { "prim": "address" }
                          ]
                        }
                      ]
                    },
                    {
                      "prim": "or",
                      "args": [
                        { "prim": "or", "args": [ { "prim": "pair", "args": [ { "prim": "string" }, { "prim": "bytes" } ] }, { "prim": "bool" } ] },
                        {
                          "prim": "or",
                          "args": [
                            {
                              "prim": "list",
                              "args": [
                                {
                                  "prim": "pair",
                                  "args": [
                                    { "prim": "address" },
                                    {
                                      "prim": "list",
                                      "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "pair", "args": [ { "prim": "nat" }, { "prim": "nat" } ] } ] } ]
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              "prim": "list",
                              "args": [
                                {
                                  "prim": "or",
                                  "args": [
                                    { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] } ] },
                                    { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] } ] }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "prim": "pair",
                  "args": [
                    {
                      "prim": "pair",
                      "args": [
                        { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] },
                        {
                          "prim": "pair",
                          "args": [
                            { "prim": "big_map", "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] }, { "prim": "nat" } ] },
                            { "prim": "big_map", "args": [ { "prim": "string" }, { "prim": "bytes" } ] }
                          ]
                        }
                      ]
                    },
                    {
                      "prim": "pair",
                      "args": [
                        {
                          "prim": "pair",
                          "args": [
                            {
                              "prim": "big_map",
                              "args": [
                                { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] } ] },
                                { "prim": "unit" }
                              ]
                            },
                            { "prim": "bool" }
                          ]
                        },
                        {
                          "prim": "pair",
                          "args": [
                            {
                              "prim": "big_map",
                              "args": [
                                { "prim": "nat" },
                                { "prim": "pair", "args": [ { "prim": "nat" }, { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ] } ] }
                              ]
                            },
                            { "prim": "big_map", "args": [ { "prim": "nat" }, { "prim": "nat" } ] }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        { "prim": "UNPAIR" },
        {
          "prim": "IF_LEFT",
          "args": [
            [
              {
                "prim": "IF_LEFT",
                "args": [
                  [
                    {
                      "prim": "IF_LEFT",
                      "args": [
                        [
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "GET", "args": [ { "int": "3" } ] },
                          { "prim": "CDR" },
                          { "prim": "IF", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_PAUSED" } ] }, { "prim": "FAILWITH" } ], [] ] },
                          { "prim": "DUP" },
                          { "prim": "CAR" },
                          {
                            "prim": "MAP",
                            "args": [
                              [
                                { "prim": "DUP", "args": [ { "int": "3" } ] },
                                { "prim": "GET", "args": [ { "int": "5" } ] },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "2" } ] },
                                { "prim": "CDR" },
                                { "prim": "MEM" },
                                {
                                  "prim": "IF",
                                  "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_TOKEN_UNDEFINED" } ] }, { "prim": "FAILWITH" } ] ]
                                },
                                { "prim": "DUP", "args": [ { "int": "3" } ] },
                                { "prim": "CAR" },
                                { "prim": "GET", "args": [ { "int": "3" } ] },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "CDR" },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "3" } ] },
                                { "prim": "CAR" },
                                { "prim": "PAIR" },
                                { "prim": "MEM" },
                                {
                                  "prim": "IF",
                                  "args": [
                                    [
                                      { "prim": "DUP", "args": [ { "int": "3" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "GET", "args": [ { "int": "3" } ] },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "CDR" },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "3" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "PAIR" },
                                      { "prim": "GET" },
                                      { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "425" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" }
                                    ],
                                    [ { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "0" } ] }, { "prim": "SWAP" }, { "prim": "PAIR" } ]
                                  ]
                                }
                              ]
                            ]
                          },
                          { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                          { "prim": "DIG", "args": [ { "int": "2" } ] },
                          { "prim": "CDR" },
                          { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                          { "prim": "DIG", "args": [ { "int": "3" } ] },
                          { "prim": "TRANSFER_TOKENS" },
                          { "prim": "CONS" }
                        ],
                        [
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "GET", "args": [ { "int": "5" } ] },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "GET", "args": [ { "int": "4" } ] },
                          { "prim": "MEM" },
                          { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_TOKEN_UNDEFINED" } ] }, { "prim": "FAILWITH" } ] ] },
                          { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                          { "prim": "DUP", "args": [ { "int": "3" } ] },
                          { "prim": "CAR" },
                          { "prim": "GET", "args": [ { "int": "3" } ] },
                          { "prim": "DIG", "args": [ { "int": "2" } ] },
                          { "prim": "DUP" },
                          { "prim": "GET", "args": [ { "int": "4" } ] },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "4" } ] },
                          { "prim": "CAR" },
                          { "prim": "PAIR" },
                          { "prim": "GET" },
                          { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "42" } ] }, { "prim": "FAILWITH" } ], [] ] },
                          { "prim": "COMPARE" },
                          { "prim": "GE" },
                          {
                            "prim": "IF",
                            "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_INSUFFICIENT_BALANCE" } ] }, { "prim": "FAILWITH" } ] ]
                          },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "UNPAIR" },
                          { "prim": "UNPAIR" },
                          { "prim": "SWAP" },
                          { "prim": "UNPAIR" },
                          { "prim": "DUP" },
                          { "prim": "DIG", "args": [ { "int": "5" } ] },
                          { "prim": "DUP" },
                          { "prim": "GET", "args": [ { "int": "4" } ] },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "7" } ] },
                          { "prim": "CAR" },
                          { "prim": "PAIR" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "GET" },
                          { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "46" } ] }, { "prim": "FAILWITH" } ], [ { "prim": "DROP" } ] ] },
                          { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                          { "prim": "DIG", "args": [ { "int": "7" } ] },
                          { "prim": "CAR" },
                          { "prim": "GET", "args": [ { "int": "3" } ] },
                          { "prim": "DIG", "args": [ { "int": "7" } ] },
                          { "prim": "DUP" },
                          { "prim": "GET", "args": [ { "int": "4" } ] },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "9" } ] },
                          { "prim": "CAR" },
                          { "prim": "PAIR" },
                          { "prim": "GET" },
                          { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "46" } ] }, { "prim": "FAILWITH" } ], [] ] },
                          { "prim": "SUB" },
                          { "prim": "ISNAT" },
                          { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "46" } ] }, { "prim": "FAILWITH" } ], [] ] },
                          { "prim": "SOME" },
                          { "prim": "SWAP" },
                          { "prim": "UPDATE" },
                          { "prim": "PAIR" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "PAIR" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "CAR" },
                          { "prim": "GET", "args": [ { "int": "3" } ] },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "GET", "args": [ { "int": "4" } ] },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "3" } ] },
                          { "prim": "GET", "args": [ { "int": "3" } ] },
                          { "prim": "PAIR" },
                          { "prim": "MEM" },
                          {
                            "prim": "IF",
                            "args": [
                              [
                                { "prim": "SWAP" },
                                { "prim": "UNPAIR" },
                                { "prim": "UNPAIR" },
                                { "prim": "SWAP" },
                                { "prim": "UNPAIR" },
                                { "prim": "DUP" },
                                { "prim": "DIG", "args": [ { "int": "5" } ] },
                                { "prim": "DUP" },
                                { "prim": "GET", "args": [ { "int": "4" } ] },
                                { "prim": "SWAP" },
                                { "prim": "GET", "args": [ { "int": "3" } ] },
                                { "prim": "PAIR" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "2" } ] },
                                { "prim": "GET" },
                                { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "49" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                                { "prim": "ADD" },
                                { "prim": "SOME" },
                                { "prim": "SWAP" },
                                { "prim": "UPDATE" },
                                { "prim": "PAIR" },
                                { "prim": "SWAP" },
                                { "prim": "PAIR" },
                                { "prim": "PAIR" }
                              ],
                              [
                                { "prim": "SWAP" },
                                { "prim": "UNPAIR" },
                                { "prim": "UNPAIR" },
                                { "prim": "SWAP" },
                                { "prim": "UNPAIR" },
                                { "prim": "PUSH", "args": [ { "prim": "option", "args": [ { "prim": "nat" } ] }, { "prim": "Some", "args": [ { "int": "1" } ] } ] },
                                { "prim": "DIG", "args": [ { "int": "5" } ] },
                                { "prim": "DUP" },
                                { "prim": "GET", "args": [ { "int": "4" } ] },
                                { "prim": "SWAP" },
                                { "prim": "GET", "args": [ { "int": "3" } ] },
                                { "prim": "PAIR" },
                                { "prim": "UPDATE" },
                                { "prim": "PAIR" },
                                { "prim": "SWAP" },
                                { "prim": "PAIR" },
                                { "prim": "PAIR" }
                              ]
                            ]
                          },
                          { "prim": "NIL", "args": [ { "prim": "operation" } ] }
                        ]
                      ]
                    }
                  ],
                  [
                    {
                      "prim": "IF_LEFT",
                      "args": [
                        [
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "GET", "args": [ { "int": "4" } ] },
                          { "prim": "COMPARE" },
                          { "prim": "LT" },
                          {
                            "prim": "IF",
                            "args": [
                              [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "NFT-asset: cannot mint twice same token" } ] }, { "prim": "FAILWITH" } ],
                              []
                            ]
                          },
                          { "prim": "DUP" },
                          { "prim": "GET", "args": [ { "int": "4" } ] },
                          { "prim": "DUP", "args": [ { "int": "3" } ] },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "COMPARE" },
                          { "prim": "EQ" },
                          {
                            "prim": "IF",
                            "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Token-IDs should be consecutive" } ] }, { "prim": "FAILWITH" } ] ]
                          },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "UNPAIR" },
                          { "prim": "UNPAIR" },
                          { "prim": "CAR" },
                          { "prim": "DIG", "args": [ { "int": "4" } ] },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "CDR" },
                          { "prim": "DUP" },
                          { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                          { "prim": "DUP", "args": [ { "int": "7" } ] },
                          { "prim": "GET", "args": [ { "int": "4" } ] },
                          { "prim": "ADD" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "COMPARE" },
                          { "prim": "LE" },
                          { "prim": "IF", "args": [ [ { "prim": "DROP" } ], [ { "prim": "SWAP" }, { "prim": "DROP" } ] ] },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "PAIR" },
                          { "prim": "PAIR" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "CAR" },
                          { "prim": "GET", "args": [ { "int": "3" } ] },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "GET", "args": [ { "int": "4" } ] },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "3" } ] },
                          { "prim": "CAR" },
                          { "prim": "PAIR" },
                          { "prim": "MEM" },
                          {
                            "prim": "IF",
                            "args": [
                              [
                                { "prim": "SWAP" },
                                { "prim": "UNPAIR" },
                                { "prim": "UNPAIR" },
                                { "prim": "SWAP" },
                                { "prim": "UNPAIR" },
                                { "prim": "DUP" },
                                { "prim": "DIG", "args": [ { "int": "5" } ] },
                                { "prim": "DUP" },
                                { "prim": "GET", "args": [ { "int": "4" } ] },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "7" } ] },
                                { "prim": "CAR" },
                                { "prim": "PAIR" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "2" } ] },
                                { "prim": "GET" },
                                { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "17" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                                { "prim": "ADD" },
                                { "prim": "SOME" },
                                { "prim": "SWAP" },
                                { "prim": "UPDATE" },
                                { "prim": "PAIR" },
                                { "prim": "SWAP" },
                                { "prim": "PAIR" },
                                { "prim": "PAIR" },
                                { "prim": "SWAP" }
                              ],
                              [
                                { "prim": "SWAP" },
                                { "prim": "UNPAIR" },
                                { "prim": "UNPAIR" },
                                { "prim": "SWAP" },
                                { "prim": "UNPAIR" },
                                { "prim": "PUSH", "args": [ { "prim": "option", "args": [ { "prim": "nat" } ] }, { "prim": "Some", "args": [ { "int": "1" } ] } ] },
                                { "prim": "DIG", "args": [ { "int": "5" } ] },
                                { "prim": "DUP" },
                                { "prim": "GET", "args": [ { "int": "4" } ] },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "7" } ] },
                                { "prim": "CAR" },
                                { "prim": "PAIR" },
                                { "prim": "UPDATE" },
                                { "prim": "PAIR" },
                                { "prim": "SWAP" },
                                { "prim": "PAIR" },
                                { "prim": "PAIR" },
                                { "prim": "SWAP" }
                              ]
                            ]
                          },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "GET", "args": [ { "int": "5" } ] },
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "GET", "args": [ { "int": "4" } ] },
                          { "prim": "MEM" },
                          {
                            "prim": "IF",
                            "args": [
                              [
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "GET", "args": [ { "int": "6" } ] },
                                { "prim": "PUSH", "args": [ { "prim": "option", "args": [ { "prim": "nat" } ] }, { "prim": "Some", "args": [ { "int": "1" } ] } ] },
                                { "prim": "DIG", "args": [ { "int": "3" } ] },
                                { "prim": "GET", "args": [ { "int": "4" } ] },
                                { "prim": "UPDATE" },
                                { "prim": "UPDATE", "args": [ { "int": "6" } ] }
                              ],
                              [
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "GET", "args": [ { "int": "5" } ] },
                                { "prim": "DIG", "args": [ { "int": "2" } ] },
                                { "prim": "DUP" },
                                { "prim": "GET", "args": [ { "int": "3" } ] },
                                { "prim": "SWAP" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "4" } ] },
                                { "prim": "GET", "args": [ { "int": "4" } ] },
                                { "prim": "PAIR" },
                                { "prim": "SOME" },
                                { "prim": "DUP", "args": [ { "int": "4" } ] },
                                { "prim": "GET", "args": [ { "int": "4" } ] },
                                { "prim": "UPDATE" },
                                { "prim": "UPDATE", "args": [ { "int": "5" } ] },
                                { "prim": "DUP" },
                                { "prim": "GET", "args": [ { "int": "6" } ] },
                                { "prim": "PUSH", "args": [ { "prim": "option", "args": [ { "prim": "nat" } ] }, { "prim": "Some", "args": [ { "int": "1" } ] } ] },
                                { "prim": "DIG", "args": [ { "int": "3" } ] },
                                { "prim": "GET", "args": [ { "int": "4" } ] },
                                { "prim": "UPDATE" },
                                { "prim": "UPDATE", "args": [ { "int": "6" } ] }
                              ]
                            ]
                          }
                        ],
                        [
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "SENDER" },
                          { "prim": "COMPARE" },
                          { "prim": "EQ" },
                          { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_ADMIN" } ] }, { "prim": "FAILWITH" } ] ] },
                          { "prim": "SWAP" },
                          { "prim": "UNPAIR" },
                          { "prim": "UNPAIR" },
                          { "prim": "CDR" },
                          { "prim": "DIG", "args": [ { "int": "3" } ] },
                          { "prim": "PAIR" },
                          { "prim": "PAIR" },
                          { "prim": "PAIR" }
                        ]
                      ]
                    },
                    { "prim": "NIL", "args": [ { "prim": "operation" } ] }
                  ]
                ]
              }
            ],
            [
              {
                "prim": "IF_LEFT",
                "args": [
                  [
                    {
                      "prim": "IF_LEFT",
                      "args": [
                        [
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "SENDER" },
                          { "prim": "COMPARE" },
                          { "prim": "EQ" },
                          { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_ADMIN" } ] }, { "prim": "FAILWITH" } ] ] },
                          { "prim": "SWAP" },
                          { "prim": "UNPAIR" },
                          { "prim": "UNPAIR" },
                          { "prim": "SWAP" },
                          { "prim": "UNPAIR" },
                          { "prim": "SWAP" },
                          { "prim": "DUP", "args": [ { "int": "5" } ] },
                          { "prim": "CDR" },
                          { "prim": "SOME" },
                          { "prim": "DIG", "args": [ { "int": "5" } ] },
                          { "prim": "CAR" },
                          { "prim": "UPDATE" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "PAIR" }
                        ],
                        [
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "CAR" },
                          { "prim": "SENDER" },
                          { "prim": "COMPARE" },
                          { "prim": "EQ" },
                          { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_ADMIN" } ] }, { "prim": "FAILWITH" } ] ] },
                          { "prim": "SWAP" },
                          { "prim": "UNPAIR" },
                          { "prim": "SWAP" },
                          { "prim": "UNPAIR" },
                          { "prim": "CAR" },
                          { "prim": "DIG", "args": [ { "int": "3" } ] },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" },
                          { "prim": "PAIR" },
                          { "prim": "SWAP" },
                          { "prim": "PAIR" }
                        ]
                      ]
                    }
                  ],
                  [
                    {
                      "prim": "IF_LEFT",
                      "args": [
                        [
                          { "prim": "SWAP" },
                          { "prim": "DUP" },
                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                          { "prim": "GET", "args": [ { "int": "3" } ] },
                          { "prim": "CDR" },
                          { "prim": "IF", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_PAUSED" } ] }, { "prim": "FAILWITH" } ], [] ] },
                          { "prim": "DUP" },
                          {
                            "prim": "ITER",
                            "args": [
                              [
                                { "prim": "DUP" },
                                { "prim": "CDR" },
                                {
                                  "prim": "ITER",
                                  "args": [
                                    [
                                      { "prim": "DUP", "args": [ { "int": "4" } ] },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "CAR" },
                                      { "prim": "SENDER" },
                                      { "prim": "COMPARE" },
                                      { "prim": "EQ" },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] } ],
                                          [ { "prim": "SENDER" }, { "prim": "DUP", "args": [ { "int": "3" } ] }, { "prim": "CAR" }, { "prim": "COMPARE" }, { "prim": "EQ" } ]
                                        ]
                                      },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] } ],
                                          [
                                            { "prim": "DUP", "args": [ { "int": "4" } ] },
                                            { "prim": "GET", "args": [ { "int": "3" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "GET", "args": [ { "int": "3" } ] },
                                            { "prim": "SENDER" },
                                            { "prim": "DUP", "args": [ { "int": "5" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR", "args": [ { "int": "3" } ] },
                                            { "prim": "MEM" }
                                          ]
                                        ]
                                      },
                                      {
                                        "prim": "IF",
                                        "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_OPERATOR" } ] }, { "prim": "FAILWITH" } ] ]
                                      },
                                      { "prim": "DUP", "args": [ { "int": "4" } ] },
                                      { "prim": "GET", "args": [ { "int": "5" } ] },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "DUG", "args": [ { "int": "2" } ] },
                                      { "prim": "GET", "args": [ { "int": "3" } ] },
                                      { "prim": "MEM" },
                                      {
                                        "prim": "IF",
                                        "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_TOKEN_UNDEFINED" } ] }, { "prim": "FAILWITH" } ] ]
                                      },
                                      { "prim": "DUP" },
                                      { "prim": "GET", "args": [ { "int": "4" } ] },
                                      { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "0" } ] },
                                      { "prim": "COMPARE" },
                                      { "prim": "LT" },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [
                                            { "prim": "DUP" },
                                            { "prim": "GET", "args": [ { "int": "4" } ] },
                                            { "prim": "DUP", "args": [ { "int": "5" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "GET", "args": [ { "int": "3" } ] },
                                            { "prim": "DUP", "args": [ { "int": "3" } ] },
                                            { "prim": "GET", "args": [ { "int": "3" } ] },
                                            { "prim": "DUP", "args": [ { "int": "5" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "403" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "COMPARE" },
                                            { "prim": "GE" },
                                            {
                                              "prim": "IF",
                                              "args": [
                                                [],
                                                [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_INSUFFICIENT_BALANCE" } ] }, { "prim": "FAILWITH" } ]
                                              ]
                                            },
                                            { "prim": "DUP", "args": [ { "int": "4" } ] },
                                            { "prim": "UNPAIR" },
                                            { "prim": "UNPAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "UNPAIR" },
                                            { "prim": "DUP" },
                                            { "prim": "DUP", "args": [ { "int": "6" } ] },
                                            { "prim": "GET", "args": [ { "int": "3" } ] },
                                            { "prim": "DUP", "args": [ { "int": "8" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                                            { "prim": "GET" },
                                            {
                                              "prim": "IF_NONE",
                                              "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "407" } ] }, { "prim": "FAILWITH" } ], [ { "prim": "DROP" } ] ]
                                            },
                                            { "prim": "DUP", "args": [ { "int": "6" } ] },
                                            { "prim": "GET", "args": [ { "int": "4" } ] },
                                            { "prim": "DIG", "args": [ { "int": "9" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "GET", "args": [ { "int": "3" } ] },
                                            { "prim": "DUP", "args": [ { "int": "8" } ] },
                                            { "prim": "GET", "args": [ { "int": "3" } ] },
                                            { "prim": "DUP", "args": [ { "int": "10" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR" },
                                            { "prim": "GET" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "407" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "SUB" },
                                            { "prim": "ISNAT" },
                                            { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "407" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                            { "prim": "SOME" },
                                            { "prim": "SWAP" },
                                            { "prim": "UPDATE" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "4" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "GET", "args": [ { "int": "3" } ] },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "GET", "args": [ { "int": "3" } ] },
                                            { "prim": "SWAP" },
                                            { "prim": "DUP" },
                                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "PAIR" },
                                            { "prim": "MEM" },
                                            {
                                              "prim": "IF",
                                              "args": [
                                                [
                                                  { "prim": "DIG", "args": [ { "int": "3" } ] },
                                                  { "prim": "UNPAIR" },
                                                  { "prim": "UNPAIR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "UNPAIR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "GET", "args": [ { "int": "3" } ] },
                                                  { "prim": "SWAP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                  { "prim": "CAR" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                  { "prim": "GET" },
                                                  {
                                                    "prim": "IF_NONE",
                                                    "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "410" } ] }, { "prim": "FAILWITH" } ], [] ]
                                                  },
                                                  { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                  { "prim": "GET", "args": [ { "int": "4" } ] },
                                                  { "prim": "ADD" },
                                                  { "prim": "SOME" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "UPDATE" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] }
                                                ],
                                                [
                                                  { "prim": "DIG", "args": [ { "int": "3" } ] },
                                                  { "prim": "UNPAIR" },
                                                  { "prim": "UNPAIR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "UNPAIR" },
                                                  { "prim": "DUP", "args": [ { "int": "5" } ] },
                                                  { "prim": "GET", "args": [ { "int": "4" } ] },
                                                  { "prim": "SOME" },
                                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "GET", "args": [ { "int": "3" } ] },
                                                  { "prim": "SWAP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "UPDATE" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] }
                                                ]
                                              ]
                                            }
                                          ],
                                          [ { "prim": "DROP" } ]
                                        ]
                                      }
                                    ]
                                  ]
                                },
                                { "prim": "DROP" }
                              ]
                            ]
                          },
                          { "prim": "DROP" }
                        ],
                        [
                          { "prim": "DUP" },
                          {
                            "prim": "ITER",
                            "args": [
                              [
                                {
                                  "prim": "IF_LEFT",
                                  "args": [
                                    [
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SENDER" },
                                      { "prim": "COMPARE" },
                                      { "prim": "EQ" },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] } ],
                                          [
                                            { "prim": "DUP", "args": [ { "int": "3" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "SENDER" },
                                            { "prim": "COMPARE" },
                                            { "prim": "EQ" }
                                          ]
                                        ]
                                      },
                                      {
                                        "prim": "IF",
                                        "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_ADMIN_OR_OPERATOR" } ] }, { "prim": "FAILWITH" } ] ]
                                      },
                                      { "prim": "DIG", "args": [ { "int": "2" } ] },
                                      { "prim": "UNPAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "UNPAIR" },
                                      { "prim": "UNPAIR" },
                                      { "prim": "PUSH", "args": [ { "prim": "option", "args": [ { "prim": "unit" } ] }, { "prim": "Some", "args": [ { "prim": "Unit" } ] } ] },
                                      { "prim": "DIG", "args": [ { "int": "5" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "GET", "args": [ { "int": "4" } ] },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "GET", "args": [ { "int": "3" } ] },
                                      { "prim": "SWAP" },
                                      { "prim": "CAR" },
                                      { "prim": "PAIR", "args": [ { "int": "3" } ] },
                                      { "prim": "UPDATE" },
                                      { "prim": "PAIR" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" }
                                    ],
                                    [
                                      { "prim": "DUP" },
                                      { "prim": "CAR" },
                                      { "prim": "SENDER" },
                                      { "prim": "COMPARE" },
                                      { "prim": "EQ" },
                                      {
                                        "prim": "IF",
                                        "args": [
                                          [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] } ],
                                          [
                                            { "prim": "DUP", "args": [ { "int": "3" } ] },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "SENDER" },
                                            { "prim": "COMPARE" },
                                            { "prim": "EQ" }
                                          ]
                                        ]
                                      },
                                      {
                                        "prim": "IF",
                                        "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_ADMIN_OR_OPERATOR" } ] }, { "prim": "FAILWITH" } ] ]
                                      },
                                      { "prim": "DIG", "args": [ { "int": "2" } ] },
                                      { "prim": "UNPAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "UNPAIR" },
                                      { "prim": "UNPAIR" },
                                      { "prim": "NONE", "args": [ { "prim": "unit" } ] },
                                      { "prim": "DIG", "args": [ { "int": "5" } ] },
                                      { "prim": "DUP" },
                                      { "prim": "GET", "args": [ { "int": "4" } ] },
                                      { "prim": "SWAP" },
                                      { "prim": "DUP" },
                                      { "prim": "GET", "args": [ { "int": "3" } ] },
                                      { "prim": "SWAP" },
                                      { "prim": "CAR" },
                                      { "prim": "PAIR", "args": [ { "int": "3" } ] },
                                      { "prim": "UPDATE" },
                                      { "prim": "PAIR" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" },
                                      { "prim": "PAIR" },
                                      { "prim": "SWAP" }
                                    ]
                                  ]
                                }
                              ]
                            ]
                          },
                          { "prim": "DROP" }
                        ]
                      ]
                    }
                  ]
                ]
              },
              { "prim": "NIL", "args": [ { "prim": "operation" } ] }
            ]
          ]
        },
        { "prim": "PAIR" }
      ]
    ]
  }
]

const FA2_STORAGE_JSON = {
  "prim": "Pair",
  "args": [
    {
      "prim": "Pair",
      "args": [
        { "prim": "Pair", "args": [ { "string": "tz1bm9dFuBnSzTzgZKuHjJsFfrPfdkVgj1PW" }, { "int": "0" } ] },
        {
          "prim": "Pair",
          "args": [
            [],
            [
              { "prim": "Elt", "args": [ { "string": "" }, { "bytes": "74657a6f732d73746f726167653a636f6e74656e74" } ] },
              {
                "prim": "Elt",
                "args": [
                  { "string": "content" },
                  {
                    "bytes":
                      "7b226e616d6522203a20225370686572652e4152542046413220436f6e7472616374222c2022617574686f72223a2022436f64654465636f64657273222c2022737461747573223a2022496e20446576656c6f706d656e74227d"
                  }
                ]
              }
            ]
          ]
        }
      ]
    },
    { "prim": "Pair", "args": [ { "prim": "Pair", "args": [ [], { "prim": "False" } ] }, { "prim": "Pair", "args": [ [], [] ] } ] }
  ]
}

const CODE_JSON = [
  {
    "prim": "storage",
    "args": [
      {
        "prim": "pair",
        "args": [
          { "prim": "address", "annots": [ "%contract_address" ] },
          {
            "prim": "pair",
            "args": [
              { "prim": "nat", "annots": [ "%counter" ] },
              {
                "prim": "map",
                "args": [
                  { "prim": "nat" },
                  {
                    "prim": "pair",
                    "args": [
                      {
                        "prim": "pair",
                        "args": [
                          { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%creator" ] }, { "prim": "bool", "annots": [ "%isNew" ] } ] },
                          { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "mutez", "annots": [ "%price" ] } ] }
                        ]
                      },
                      {
                        "prim": "pair",
                        "args": [
                          { "prim": "pair", "args": [ { "prim": "int", "annots": [ "%timestamp" ] }, { "prim": "string", "annots": [ "%title" ] } ] },
                          { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%tokenUrl" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] }
                        ]
                      }
                    ]
                  }
                ],
                "annots": [ "%spheres" ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "prim": "parameter",
    "args": [
      {
        "prim": "or",
        "args": [
          {
            "prim": "pair",
            "args": [
              { "prim": "pair", "args": [ { "prim": "nat", "annots": [ "%price" ] }, { "prim": "int", "annots": [ "%timestamp" ] } ] },
              { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%title" ] }, { "prim": "string", "annots": [ "%tokenUrl" ] } ] }
            ],
            "annots": [ "%createItem" ]
          },
          { "prim": "nat", "annots": [ "%createSale" ] }
        ]
      }
    ]
  },
  {
    "prim": "code",
    "args": [
      [
        { "prim": "UNPAIR" },
        {
          "prim": "IF_LEFT",
          "args": [
            [
              { "prim": "DUP" },
              { "prim": "CAR" },
              { "prim": "CAR" },
              { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "0" } ] },
              { "prim": "SWAP" },
              { "prim": "COMPARE" },
              { "prim": "GE" },
              {
                "prim": "IF",
                "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: params.sphere.price >= 0" } ] }, { "prim": "FAILWITH" } ] ]
              },
              { "prim": "NIL", "args": [ { "prim": "operation" } ] },
              { "prim": "DUP", "args": [ { "int": "3" } ] },
              { "prim": "CAR" },
              {
                "prim": "CONTRACT",
                "args": [
                  {
                    "prim": "pair",
                    "args": [ { "prim": "address" }, { "prim": "pair", "args": [ { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ] }, { "prim": "nat" } ] } ]
                  }
                ],
                "annots": [ "%mint" ]
              },
              { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "64" } ] }, { "prim": "FAILWITH" } ], [] ] },
              { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
              { "prim": "DUP", "args": [ { "int": "5" } ] },
              { "prim": "GET", "args": [ { "int": "3" } ] },
              {
                "prim": "PUSH",
                "args": [
                  { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ] },
                  [
                    { "prim": "Elt", "args": [ { "string": "decimals" }, { "bytes": "30" } ] },
                    { "prim": "Elt", "args": [ { "string": "name" }, { "bytes": "5370686572652e41525420546f6b656e" } ] },
                    { "prim": "Elt", "args": [ { "string": "symbol" }, { "bytes": "535048455245" } ] }
                  ]
                ]
              },
              { "prim": "SENDER" },
              { "prim": "PAIR", "args": [ { "int": "3" } ] },
              { "prim": "TRANSFER_TOKENS" },
              { "prim": "CONS" },
              { "prim": "DUP", "args": [ { "int": "3" } ] },
              { "prim": "DUP" },
              { "prim": "GET", "args": [ { "int": "4" } ] },
              { "prim": "DUP", "args": [ { "int": "5" } ] },
              { "prim": "GET", "args": [ { "int": "3" } ] },
              { "prim": "DUP", "args": [ { "int": "5" } ] },
              { "prim": "GET", "args": [ { "int": "4" } ] },
              { "prim": "PAIR" },
              { "prim": "DIG", "args": [ { "int": "4" } ] },
              { "prim": "DUP" },
              { "prim": "GET", "args": [ { "int": "3" } ] },
              { "prim": "SWAP" },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "6" } ] },
              { "prim": "CAR" },
              { "prim": "CDR" },
              { "prim": "PAIR" },
              { "prim": "PAIR" },
              { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "1" } ] },
              { "prim": "DIG", "args": [ { "int": "5" } ] },
              { "prim": "CAR" },
              { "prim": "CAR" },
              { "prim": "MUL" },
              { "prim": "SENDER" },
              { "prim": "PAIR" },
              { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
              { "prim": "SENDER" },
              { "prim": "PAIR" },
              { "prim": "PAIR" },
              { "prim": "PAIR" },
              { "prim": "SOME" },
              { "prim": "DIG", "args": [ { "int": "4" } ] },
              { "prim": "GET", "args": [ { "int": "3" } ] },
              { "prim": "UPDATE" },
              { "prim": "UPDATE", "args": [ { "int": "4" } ] },
              { "prim": "DUP" },
              { "prim": "GET", "args": [ { "int": "3" } ] },
              { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
              { "prim": "ADD" },
              { "prim": "UPDATE", "args": [ { "int": "3" } ] },
              { "prim": "SWAP" }
            ],
            [
              { "prim": "SWAP" },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "2" } ] },
              { "prim": "GET", "args": [ { "int": "4" } ] },
              { "prim": "SWAP" },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "2" } ] },
              { "prim": "GET" },
              { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "75" } ] }, { "prim": "FAILWITH" } ], [] ] },
              { "prim": "CAR" },
              { "prim": "GET", "args": [ { "int": "4" } ] },
              { "prim": "AMOUNT" },
              { "prim": "COMPARE" },
              { "prim": "EQ" },
              {
                "prim": "IF",
                "args": [
                  [],
                  [
                    { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: sp.amount == self.data.spheres[params.token_id].price" } ] },
                    { "prim": "FAILWITH" }
                  ]
                ]
              },
              { "prim": "NIL", "args": [ { "prim": "operation" } ] },
              { "prim": "DUP", "args": [ { "int": "3" } ] },
              { "prim": "GET", "args": [ { "int": "4" } ] },
              { "prim": "DUP", "args": [ { "int": "3" } ] },
              { "prim": "GET" },
              { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "75" } ] }, { "prim": "FAILWITH" } ], [] ] },
              { "prim": "CAR" },
              { "prim": "GET", "args": [ { "int": "3" } ] },
              { "prim": "CONTRACT", "args": [ { "prim": "unit" } ] },
              { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "77" } ] }, { "prim": "FAILWITH" } ], [] ] },
              { "prim": "AMOUNT" },
              { "prim": "UNIT" },
              { "prim": "TRANSFER_TOKENS" },
              { "prim": "CONS" },
              { "prim": "DIG", "args": [ { "int": "2" } ] },
              { "prim": "DUP" },
              { "prim": "GET", "args": [ { "int": "4" } ] },
              { "prim": "DUP" },
              { "prim": "DUP", "args": [ { "int": "5" } ] },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "2" } ] },
              { "prim": "GET" },
              { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "78" } ] }, { "prim": "FAILWITH" } ], [] ] },
              { "prim": "UNPAIR" },
              { "prim": "UNPAIR" },
              { "prim": "SWAP" },
              { "prim": "CDR" },
              { "prim": "SENDER" },
              { "prim": "PAIR" },
              { "prim": "SWAP" },
              { "prim": "PAIR" },
              { "prim": "PAIR" },
              { "prim": "SOME" },
              { "prim": "SWAP" },
              { "prim": "UPDATE" },
              { "prim": "UPDATE", "args": [ { "int": "4" } ] },
              { "prim": "DUP" },
              { "prim": "DUG", "args": [ { "int": "3" } ] },
              { "prim": "CAR" },
              {
                "prim": "CONTRACT",
                "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] } ] } ],
                "annots": [ "%buy" ]
              },
              { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "79" } ] }, { "prim": "FAILWITH" } ], [] ] },
              { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
              { "prim": "DUP", "args": [ { "int": "4" } ] },
              { "prim": "SENDER" },
              { "prim": "DUP", "args": [ { "int": "7" } ] },
              { "prim": "GET", "args": [ { "int": "4" } ] },
              { "prim": "DUP", "args": [ { "int": "7" } ] },
              { "prim": "GET" },
              { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "75" } ] }, { "prim": "FAILWITH" } ], [] ] },
              { "prim": "CAR" },
              { "prim": "CAR" },
              { "prim": "CAR" },
              { "prim": "PAIR", "args": [ { "int": "3" } ] },
              { "prim": "TRANSFER_TOKENS" },
              { "prim": "CONS" },
              { "prim": "DUP", "args": [ { "int": "3" } ] },
              { "prim": "GET", "args": [ { "int": "4" } ] },
              { "prim": "DUP", "args": [ { "int": "3" } ] },
              { "prim": "GET" },
              { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "75" } ] }, { "prim": "FAILWITH" } ], [] ] },
              { "prim": "CAR" },
              { "prim": "CAR" },
              { "prim": "CDR" },
              {
                "prim": "IF",
                "args": [
                  [
                    { "prim": "DIG", "args": [ { "int": "2" } ] },
                    { "prim": "DUP" },
                    { "prim": "GET", "args": [ { "int": "4" } ] },
                    { "prim": "DUP" },
                    { "prim": "DIG", "args": [ { "int": "4" } ] },
                    { "prim": "DUP" },
                    { "prim": "DUG", "args": [ { "int": "2" } ] },
                    { "prim": "GET" },
                    { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "82" } ] }, { "prim": "FAILWITH" } ], [] ] },
                    { "prim": "UNPAIR" },
                    { "prim": "UNPAIR" },
                    { "prim": "CAR" },
                    { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "False" } ] },
                    { "prim": "SWAP" },
                    { "prim": "PAIR" },
                    { "prim": "PAIR" },
                    { "prim": "PAIR" },
                    { "prim": "SOME" },
                    { "prim": "SWAP" },
                    { "prim": "UPDATE" },
                    { "prim": "UPDATE", "args": [ { "int": "4" } ] },
                    { "prim": "SWAP" }
                  ],
                  [ { "prim": "SWAP" }, { "prim": "DROP" } ]
                ]
              }
            ]
          ]
        },
        { "prim": "NIL", "args": [ { "prim": "operation" } ] },
        { "prim": "SWAP" },
        { "prim": "ITER", "args": [ [ { "prim": "CONS" } ] ] },
        { "prim": "PAIR" }
      ]
    ]
  }
]

const STORAGE_JSON = { "prim": "Pair", "args": [ { "string": "KT1SyGU9L3mLqWDHCg737UvnWgPKkRwM34zo" }, { "prim": "Pair", "args": [ { "int": "0" }, [] ] } ] }
export { FA2_CODE_JSON, FA2_STORAGE_JSON, CODE_JSON, STORAGE_JSON };
