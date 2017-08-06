pragma solidity ^ 0.4 .4;

contract Registry {

  address[16] public registrars;

  function register(uint PUID) public returns(uint) {
    require(PUID >= 0 && PUID <= 15);
    registrars[PUID] = msg.sender;
    return PUID;
  }


  function getRegistrars() public returns(address[16]) {
    return registrars;
  }
}
