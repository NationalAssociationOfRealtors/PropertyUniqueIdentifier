App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load puids.
    $.getJSON('../puids.json', function(data) {
      var puidsRow = $('#puidsRow');
      var puidTemplate = $('#puidTemplate');

      for (i = 0; i < data.length; i++) {
        puidTemplate.find('.panel-title').text(data[i].address);
        puidTemplate.find('img').attr('src', data[i].picture);
        puidTemplate.find('.puid-propertytype').text(data[i].propertytype);
        puidTemplate.find('.puid-age').text(data[i].age);
        puidTemplate.find('.puid-location').text(data[i].location);
        puidTemplate.find('.btn-register').attr('data-id', data[i].id);

        puidsRow.append(puidTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Registry.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var RegistryArtifact = data;
      App.contracts.Registry = TruffleContract(RegistryArtifact);

      // Set the provider for our contract.
      App.contracts.Registry.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the registered properties
      return App.markRegistered();
    });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-register', App.handleRegister);
  },

  handleRegister: function() {
    event.preventDefault();

    var puidId = parseInt($(event.target).data('id'));

    var registryInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Registry.deployed().then(function(instance) {
        registryInstance = instance;

        return registryInstance.register(puidId, {
          from: account
        });
      }).then(function(result) {
        return App.markRegistered();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  markRegistered: function(registrar, account) {
    var registryInstance;

    App.contracts.Registry.deployed().then(function(instance) {
      registryInstance = instance;

      return registryInstance.getRegistrars.call();
    }).then(function(registrars) {
      for (i = 0; i < registrars.length; i++) {
        if (registrars[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-puid').eq(i).find('button').text('PUID ADDED TO LEDGER').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
