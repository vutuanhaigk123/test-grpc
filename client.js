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
  "18.138.196.29:3002",
  grpc.credentials.createInsecure()
);

async function getAllPaymentsInfo() {
  return new Promise((resolve, reject) => {
    client.getAllPaymentsInfo({}, (error, resp) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(resp);
    });
  });
}

const resp = await getAllPaymentsInfo();
resp.paymentsInfoList.forEach((paymentInfo) => {
  console.log(paymentInfo);
});
