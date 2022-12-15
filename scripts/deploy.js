async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
    const Nft= await ethers.getContractFactory("NFT");
    const nft = await Nft.deploy();
    const Marketplace = await ethers.getContractFactory("MarketPlace");
    const marketplace = await Marketplace.deploy(10);
  
    
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });