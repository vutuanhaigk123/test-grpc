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

const PaymentService =
  grpc.loadPackageDefinition(packageDefinition).PaymentService;

const client = new PaymentService(
  "13.215.201.3:3002",
  grpc.credentials.createInsecure()
);

client.getAllPaymentsInfo({}, (error, resp) => {
  if (error) throw error;
  resp.paymentsInfoList.forEach((paymentInfo) => {
    console.log(paymentInfo);
  });
});
