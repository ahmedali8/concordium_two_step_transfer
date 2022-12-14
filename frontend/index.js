let currentAccountAddress = "";

async function setupPage() {
  const provider = await concordiumHelpers.detectConcordiumProvider();

  document.getElementById("connect").addEventListener("click", () => {
    provider.connect().then((accountAddress) => {
      currentAccountAddress = accountAddress;
      document.getElementById("accountAddress").innerHTML = accountAddress;
    });
  });

  document.getElementById("sendTransfer").addEventListener("click", () =>
    provider
      .sendTransaction(
        currentAccountAddress,
        concordiumSDK.AccountTransactionType.SimpleTransfer,
        {
          amount: new concordiumSDK.GtuAmount(1n),
          toAddress: new concordiumSDK.AccountAddress(
            "39bKAuC7sXCZQfo7DmVQTMbiUuBMQJ5bCfsS7sva1HvDnUXp13"
          ),
        }
      )
      .then(alert)
      .catch(alert)
  );

  document.getElementById("signMessage").addEventListener("click", () =>
    provider
      .signMessage(currentAccountAddress, message.value)
      .then((sig) => alert(JSON.stringify(sig)))
      .catch(alert)
  );

  document.getElementById("sendDeposit").addEventListener("click", () =>
    provider
      .sendTransaction(
        currentAccountAddress,
        concordiumSDK.AccountTransactionType.UpdateSmartContractInstance,
        {
          amount: new concordiumSDK.GtuAmount(1n),
          contractAddress: {
            index: 98n,
            subindex: 0n,
          },
          receiveName: "two-step-transfer.deposit",
          maxContractExecutionEnergy: 30000n,
        }
      )
      .then(alert)
      .catch(alert)
  );

  document.getElementById("sendReceive").addEventListener("click", () =>
    provider
      .sendTransaction(
        currentAccountAddress,
        concordiumSDK.AccountTransactionType.UpdateSmartContractInstance,
        {
          amount: new concordiumSDK.GtuAmount(1n),
          contractAddress: {
            index: 98n,
            subindex: 0n,
          },
          receiveName: "two-step-transfer.receive",
          maxContractExecutionEnergy: 30000n,
        },
        {
          RequestTransfer: [
            "1000",
            "1",
            "3Y1RLgi5pW3x96xZ7CiDiKsTL9huU92qn6mfxpebwmtkeku8ry",
          ],
        },
        "AQAAABEAAAB0d28tc3RlcC10cmFuc2ZlcgEUAAIAAAALAAAAaW5pdF9wYXJhbXMUAAMAAAAPAAAAYWNjb3VudF9ob2xkZXJzEQALHAAAAHRyYW5zZmVyX2FncmVlbWVudF90aHJlc2hvbGQCFAAAAHRyYW5zZmVyX3JlcXVlc3RfdHRsDggAAAByZXF1ZXN0cxIBBRQABAAAAA8AAAB0cmFuc2Zlcl9hbW91bnQKDgAAAHRhcmdldF9hY2NvdW50CwwAAAB0aW1lc19vdXRfYXQNCgAAAHN1cHBvcnRlcnMRAgsBFAADAAAADwAAAGFjY291bnRfaG9sZGVycxEACxwAAAB0cmFuc2Zlcl9hZ3JlZW1lbnRfdGhyZXNob2xkAhQAAAB0cmFuc2Zlcl9yZXF1ZXN0X3R0bA4BAAAABwAAAHJlY2VpdmUVAgAAAA8AAABSZXF1ZXN0VHJhbnNmZXIBAwAAAAUKCw8AAABTdXBwb3J0VHJhbnNmZXIBAwAAAAUKCw=="
      )
      .then(alert)
      .catch(alert)
  );

  document.getElementById("sendInit").addEventListener("click", () =>
    provider
      .sendTransaction(
        currentAccountAddress,
        concordiumSDK.AccountTransactionType.InitializeSmartContractInstance,
        {
          amount: new concordiumSDK.GtuAmount(1n),
          moduleRef: new concordiumSDK.ModuleReference(
            "bac22b1a632cd9aebf352269d32f9449ee9324c98f3f9f8f7dbe15f93ca7da83"
          ),
          contractName: "two-step-transfer",
          maxContractExecutionEnergy: 30000n,
        },
        {
          account_holders: [
            "48TRMDdVErkZEymNPu49SjmoFy1CNC1snYjLQdSTptN4188vBv",
            "4bccy5kUbgtRjXZirHbNviG3d5aTZPZduzykZkdAGeAuNV4ZX7",
          ],
          transfer_agreement_threshold: 2,
          transfer_request_ttl: "1h",
        },
        "AQAAABEAAAB0d28tc3RlcC10cmFuc2ZlcgEUAAIAAAALAAAAaW5pdF9wYXJhbXMUAAMAAAAPAAAAYWNjb3VudF9ob2xkZXJzEQALHAAAAHRyYW5zZmVyX2FncmVlbWVudF90aHJlc2hvbGQCFAAAAHRyYW5zZmVyX3JlcXVlc3RfdHRsDggAAAByZXF1ZXN0cxIBBRQABAAAAA8AAAB0cmFuc2Zlcl9hbW91bnQKDgAAAHRhcmdldF9hY2NvdW50CwwAAAB0aW1lc19vdXRfYXQNCgAAAHN1cHBvcnRlcnMRAgsBFAADAAAADwAAAGFjY291bnRfaG9sZGVycxEACxwAAAB0cmFuc2Zlcl9hZ3JlZW1lbnRfdGhyZXNob2xkAhQAAAB0cmFuc2Zlcl9yZXF1ZXN0X3R0bA4BAAAABwAAAHJlY2VpdmUVAgAAAA8AAABSZXF1ZXN0VHJhbnNmZXIBAwAAAAUKCw8AAABTdXBwb3J0VHJhbnNmZXIBAwAAAAUKCw=="
      )
      .then(alert)
      .catch(alert)
  );

  provider.on(
    "accountDisconnected",
    (accountAddress) => (currentAccountAddress = undefined)
  );
  provider.on(
    "accountChanged",
    (accountAddress) => (currentAccountAddress = accountAddress)
  );
  provider.on("chainChanged", (chain) => alert(chain));
}

setupPage();
