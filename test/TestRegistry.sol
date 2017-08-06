pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Registry.sol";


contract TestRegistry {
  Registry registry = Registry(DeployedAddresses.Registry());

  function testRegistrarCanRegister() {
    uint returnedId = registry.register(8);

    uint expected = 8;

    Assert.equal(returnedId, expected, "PUID of property 8 should be recorded.");
  }

  function testGetRegistrarByPUID() {
    address expected = this;

    address registrar = registry.registrars(8);

    Assert.equal(registrar, expected, "Owner of property ID 8 should be recorded.");
  }

  function testGetRegistrarAddressByPUIDInArray() {
    address expected = this;

    address[16] memory registrars = registry.getRegistrars();

    Assert.equal(registrars[8], expected, "Owner of property ID 8 should be recorded.");
  }
}
