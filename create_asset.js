/*jslint node: true */
"use strict";
var headlessWallet = require('trustnote-headless');
var eventBus = require('trustnote-common/event_bus.js');
var assetUtils = require('./assetUtils.js');
var fs = require('fs');
headlessWallet.setupChatEventHandlers();

eventBus.on('headless_wallet_ready', function(){
	headlessWallet.readSingleAddress(function(address){
		setTimeout(function(){
			var asset = {
				cap: 100000,
				is_private: false,
				is_transferrable: true,
				auto_destroy: false,
				fixed_denominations: false,
				issued_by_definer_only: true,
				cosigned_by_definer: false,
				spender_attested: false,
			};
			assetUtils.issueAsset(asset,address,writeTokenId);
		},3000);
	});
});

function writeTokenId(TokenId){
	var ajson = {TokenId:TokenId};
	fs.writeFile("./asset.json", JSON.stringify(ajson, null, '\t'), 'utf8', function(err){
		if (err)
			throw Error("failed to write json");
	});
}

function writeAddress(address){
	var ajson = {address:address};
	fs.writeFile("./address.json", JSON.stringify(ajson, null, '\t'), 'utf8', function(err){
		if (err)
			throw Error("failed to write json");
	});
}