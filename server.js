import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const PROTO_PATH = "./proto/paymentService.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const paymentsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
const paymentsInfoList = [{ id: "1" }, { id: "2" }];

server.addService(paymentsProto.PaymentService.service, {
  getAllPaymentsInfo: (call, callback) => {
    console.log("call:" + call, call.length, call[0]);
    callback(null, { paymentsInfoList });
  },
});

server.bindAsync(
  "0.0.0.0:3002",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(`Server is running at 0.0.0.0:${port}`);
    server.start();
  }
);
