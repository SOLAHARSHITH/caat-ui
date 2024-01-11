const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Parse JSON data
app.use(bodyParser.json());

// Route for receiving JSON data
app.post("/api/data", (req, res) => {
  const receivedData = req.body;
  console.log("Received data:", receivedData);

  // Process the received data and send a response
  const response = {
    message: "Data received successfully",
    data: receivedData,
  };
  res.json(response);
});

// Route for getting data
app.get("/api/external/package/search", (req, res) => {
  const data = [
    {
      id: 4,
      identifier: "ec2_nsg_connector_package",
      name: "connector",
      type: "AWS",
      description: null,
    },
    {
      id: 5,
      identifier: "Package-EC2",
      name: "EC2",
      type: "AWS",
      description: null,
    },
    {
      id: 7,
      identifier: "Package-NSG",
      name: "NSG",
      type: "AWS",
      description: null,
    },
  ];
  res.json(data);
});

app.get("/api/external/package/registry/Package-EC2", (req, res) => {
  const data = {
    name: "EC2",
    "resource-type": "asset",
    input_parameters: {
      json_schema: {
        type: "object",
        additionalProperties: false,
        required: ["title", "ImageId", "InstanceType"],
        properties: {
          title: { type: "string", minLength: 3, pattern: "^[a-zA-Z0-9]+$" },
          ImageId: { type: "string" },
          InstanceType: {
            type: "string",
            enum: [
              "t2.nano",
              "t2.micro",
              "t2.small",
              "t2.medium",
              "t2.large",
              "t2.xlarge",
              "t2.2xlarge",
              "t3.nano",
              "t3.micro",
              "t3.small",
              "t3.medium",
              "t3.large",
              "t3.xlarge",
              "t3.2xlarge",
            ],
          },
        },
      },
      template: { title: "", ImageId: "", InstanceType: "" },
      optional: {},
    },
    package_json: {
      "package-json-version": "v1.0.0",
      name: "EC2",
      packageID: "Package-EC2",
      description: "Package for managing EC2 Resource",
      "resource-type": "asset",
      type: "AWS",
      "sub-type": "IaC",
      "access-type": "public",
      version: "v1.0.0",
      "version-name": "blue-star",
      image: "warissharma/iac_aws",
      path: {
        input_json: { type: "file", value: "Configuration/input.json" },
        output_json: { type: "file", value: "Configuration/output.json" },
        input_json_schema: {
          type: "file",
          value: "Configuration/input_schema.json",
        },
        output_json_schema: {
          type: "file",
          value: "Configuration/output_schema.json",
        },
        git_enabled_directory: {
          type: "directory",
          value: "git_enabled_directory/",
        },
        main_action_directory: { type: "directory", value: "main/" },
        main_action_script: { type: "file", value: "main/main.sh" },
        test_directory: { type: "directory", value: "test/" },
        test_script: { type: "file", value: "test/test.sh" },
        validation_directory: { type: "directory", value: "validate/" },
        validation_script: { type: "file", value: "validate/validate.sh" },
        clean_up_directory: { type: "directory", value: "clean_up/" },
        clean_up_script: { type: "file", value: "clean_up/clean_up.sh" },
        environment_setup_directory: {
          type: "directory",
          value: "environment_setup_directory/",
        },
        environment_setup_script: {
          type: "file",
          value: "environment_setup_directory/environment_setup_directory.sh",
        },
        revert_module_directory: {
          type: "directory",
          value: "revert_module_directory/",
        },
        revert_module_script: {
          type: "file",
          value: "revert_module_script/revert_module_script.sh",
        },
      },
    },
  };
  res.json(data);
});
app.get("/api/external/package/registry/Package-NSG", (req, res) => {
  const data = {
    name: "NSG",
    "resource-type": "asset",
    input_parameters: {
      json_schema: {
        type: "object",
        additionalProperties: false,
        required: ["title", "GroupDescription"],
        properties: {
          title: { type: "string", minLength: 3, pattern: "^[a-zA-Z0-9]+$" },
          GroupDescription: { type: "string", minLength: 3 },
          GroupName: { type: "string" },
          SecurityGroupEgress: {
            type: "object",
            additionalProperties: false,
            required: ["IpProtocol", "FromPort", "ToPort", "CidrIp"],
            properties: {
              IpProtocol: { type: "string" },
              FromPort: { type: "number", minimum: 0 },
              ToPort: { type: "number", minimum: 0 },
              CidrIp: { type: "string" },
            },
          },
          SecurityGroupIngress: {
            type: "object",
            additionalProperties: false,
            required: ["IpProtocol", "FromPort", "ToPort", "CidrIp"],
            properties: {
              IpProtocol: { type: "string" },
              FromPort: { type: "number", minimum: 0 },
              ToPort: { type: "number", minimum: 0 },
              CidrIp: { type: "string" },
            },
          },
          VpcId: { type: "string" },
        },
      },
      template: { title: "", GroupDescription: "" },
      optional: {
        GroupName: "",
        SecurityGroupEgress: {
          IpProtocol: "",
          FromPort: -1,
          ToPort: -1,
          CidrIp: "",
        },
        SecurityGroupIngress: {
          IpProtocol: "",
          FromPort: -1,
          ToPort: -1,
          CidrIp: "",
        },
        VpcId: "",
      },
    },
    package_json: {
      "package-json-version": "v1.0.0",
      name: "NSG",
      packageID: "Package-NSG",
      description: "Package for managing EC2 Resource",
      "resource-type": "asset",
      type: "AWS",
      "sub-type": "IaC",
      "access-type": "public",
      version: "v1.0.0",
      "version-name": "blue-star",
      image: "warissharma/iac_aws",
      path: {
        input_json: { type: "file", value: "Configuration/input.json" },
        output_json: { type: "file", value: "Configuration/output.json" },
        input_json_schema: {
          type: "file",
          value: "Configuration/input_schema.json",
        },
        output_json_schema: {
          type: "file",
          value: "Configuration/output_schema.json",
        },
        git_enabled_directory: {
          type: "directory",
          value: "git_enabled_directory/",
        },
        main_action_directory: { type: "directory", value: "main/" },
        main_action_script: { type: "file", value: "main/main.sh" },
        test_directory: { type: "directory", value: "test/" },
        test_script: { type: "file", value: "test/test.sh" },
        validation_directory: { type: "directory", value: "validate/" },
        validation_script: { type: "file", value: "validate/validate.sh" },
        clean_up_directory: { type: "directory", value: "clean_up/" },
        clean_up_script: { type: "file", value: "clean_up/clean_up.sh" },
        environment_setup_directory: {
          type: "directory",
          value: "environment_setup_directory/",
        },
        environment_setup_script: {
          type: "file",
          value: "environment_setup_directory/environment_setup_directory.sh",
        },
        revert_module_directory: {
          type: "directory",
          value: "revert_module_directory/",
        },
        revert_module_script: {
          type: "file",
          value: "revert_module_script/revert_module_script.sh",
        },
      },
    },
  };
  res.json(data);
});
app.get(
  "/api/external/package/registry/ec2_nsg_connector_package",
  (req, res) => {
    const data = {
      name: "EC2_NSG_connector",
      "resource-type": "function",
      input_parameters: {
        json_schema: {
          type: "object",
          additionalProperties: false,
          required: [
            "functionID",
            "action",
            "EC2_asset_id",
            "NSG_asset_id",
            "input_file_name",
          ],
          properties: {
            input_file_name: { type: "string" },
            functionID: { type: "string" },
            action: { type: "string", enum: ["create", "delete"] },
            EC2_asset_id: { type: "string" },
            NSG_asset_id: { type: "string" },
          },
        },
        template: {
          functionID: "",
          action: "",
          EC2_asset_id: "",
          NSG_asset_id: "",
        },
        optional: {},
      },
      package_json: {
        "package-json-version": "v1.0.0",
        name: "EC2_NSG_connector",
        packageID: "ec2_nsg_connector_package",
        description: "Connects EC2 with NSG",
        type: "AWS",
        "resource-type": "function",
        "sub-type": "IaC",
        "access-type": "public",
        version: "v1.0.0",
        "version-name": "blue-star",
        image: "warissharma/iac_aws",
        path: {
          input_json: { type: "file", value: "Configuration/input.json" },
          output_json: { type: "file", value: "Configuration/output.json" },
          input_json_schema: {
            type: "file",
            value: "Configuration/input_schema.json",
          },
          output_json_schema: {
            type: "file",
            value: "Configuration/output_schema.json",
          },
          git_enabled_directory: {
            type: "directory",
            value: "git_enabled_directory/",
          },
          main_action_directory: { type: "directory", value: "main/" },
          main_action_script: { type: "file", value: "main/main.sh" },
          test_directory: { type: "directory", value: "test/" },
          test_script: { type: "file", value: "test/test.sh" },
          validation_directory: { type: "directory", value: "validate/" },
          validation_script: { type: "file", value: "validate/validate.sh" },
          clean_up_directory: { type: "directory", value: "clean_up/" },
          clean_up_script: { type: "file", value: "clean_up/clean_up.sh" },
          environment_setup_directory: {
            type: "directory",
            value: "environment_setup_directory/",
          },
          environment_setup_script: {
            type: "file",
            value: "environment_setup_directory/environment_setup_directory.sh",
          },
          revert_module_directory: {
            type: "directory",
            value: "revert_module_directory/",
          },
          revert_module_script: {
            type: "file",
            value: "revert_module_script/revert_module_script.sh",
          },
        },
      },
    };
    res.json(data);
  }
);
// Start the server
const port = 30007;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
