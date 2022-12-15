const {ethers} =require('hardhat');
const {expect} = require('chai');

describe("MarketPlace contract ",()=>{
    let accounts, nft,marketplace;
    beforeEach("Deploys",async()=>{
        accounts = await ethers.getSigners();
        Nft = await ethers.getContractFactory("NFT");
        nft = await Nft.deploy();
        const Marketplace = await ethers.getContractFactory("MarketPlace");
        marketplace = await Marketplace.deploy(10);

    })
    it ("Checks for NFT contract ",async()=>{
        await nft.mint("Some");
        expect(await nft.tokenCount()).to.equal(1);
    })
    describe("MarketPlace contract",()=>{
        it("Checks for feeAccount",async()=>{
            expect(await marketplace.feeAccount()).to.equal(accounts[0].address);
            expect(await marketplace.feepercent()).to.equal(10);
        })
        it("Checks for make item",async()=>{
            await nft.mint("Some");
            await nft.setApprovalForAll(marketplace.address, true);
            expect(await marketplace.makeItem(nft.address,1,1000)).to.emit(marketplace,"Offered").withArgs(1,nft.address,1,1000,accounts[0].address);
            expect(await marketplace.itemCount()).to.equal(1);
            const item = await marketplace.items(1);
            expect(await item.price).to.equal(1000);


        })
        it("Checks for purchase Function",async()=>{
            await nft.mint("Some");
            await nft.setApprovalForAll(marketplace.address, true);
            await marketplace.makeItem(nft.address,1,1000);
            console.log(await marketplace.getTotalPrice(1));
            expect(await marketplace.connect(accounts[1]).purchaseItem(1,{value: 10000})).to.emit(marketplace,"Bought").withArgs(1,nft.addrss,1,1000,accounts[0].address,accounts[1].address);
            const item = await marketplace.items(1);
            expect(await item.sold ).to.equal(true);
        })
        
    })
})