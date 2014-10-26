
var collections = {
  93526: [1301, 5090, 2701],
  13190: [10001, 9980, 2413],
  8660: [66, 76, 8160],
  94506: [66, 185, 1363, 408, 208, 177, 1429, 10035, 5197, 8919],
  // 2: [8977, 8710, 9980, 9997, 9996, 9948, 9957, 9934, 9819, 9695]
  // "My Survival Kit": {94506: [66, 185, 1363, 408, 208, 177, 1429, 10035, 5197, 8919]},
};


var relatedCollections = {
  "Ryan Hoover Favs" : ["Snoop Dogg's Hunts", "Erik's Top 10", "Alexis Ohanian Approved"]
};

var masterCollections = {
  "Ryan Hoover Favs" : {2: [8977, 8710, 9980, 9997, 9996, 9948, 9957, 9934, 9819, 9695]},
  // "Yo! Check It" : { 13384: [3486, 4897, 9695, 9033, 5918, 4828, 4500, 4871, 5021]},
  "Designer Tools" : {13190: [8164, 3697, 9311, 2144, 9098, 2758, 4384, 2733, 9512, 9118]},
  "Stock Photography" : { 123: [2480, 9622, 7140, 4157, 5732, 1882, 4850, 5144, 4199]},
  // "Fashion Hunt" : {93526: [1301, 5090, 2701, 5875, 3586, 7949, 7404, 4876, 8454, 9113]},
};


var getSingleItem = function(productId, userId) {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:4000/?url=v1/posts/' + productId,
    dataType: 'json',  
    success: function(json_results) {
      console.log(json_results);
      var source = $("#collection-template").html();
      var template = Handlebars.compile(source);
      var newHTML = template(json_results.post);
      var idToAppend = "#" + userId ;
      console.log(idToAppend);
      // var collectionId = "#" + collectionName;
      // console.log(collectionId);

      $(".all-collections").find(idToAppend).append(newHTML);
     }
  });
};


var getUserInfo = function(userId, collectionName, hollaback) {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:4000/?url=v1/users/' + userId,
    dataType: 'json',  
    success: function(json_results) {
      var source = $("#user-info-template").html();
      var template = Handlebars.compile(source);
      json_results.user.collection_name = collectionName;
      var newHTML = template(json_results.user);

      $(".all-collections").append(newHTML);
      hollaback();

     }
  });
};

var showCollectionDetails = function(collectionId) {
  var collection = masterCollections[collectionId];

  for (var userId in collection) {
    console.log(userId);
    getUserInfo2(userId);

    $.each( collection[userId] , function(index, productId) {
      console.log(productId);
    });
  }

};


var getUserInfo2 = function(userId, hollaback) {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:4000/?url=v1/users/' + userId,
    dataType: 'json',  
    success: function(json_results) {
      var source = $("#single-collection-details-template").html();
      var template = Handlebars.compile(source);
      // json_results.user.collection_name = collectionName;
      var newHTML = template(json_results.user);

      $(".all-collections").append(newHTML);
      hollaback();

     }
  });
};



$(document).ready(function() {
  console.log("doc ready");

  // $.each(masterCollections, function(collectionName, collectionInfo) {
  //   $.each(collectionInfo, function(userId, collectionArray) {

  //     getUserInfo(userId, collectionName, function() {
  //       $.each(collectionArray, function(index, productId) {
  //         if ( index < 9 ) {
  //           getSingleItem(productId, userId);
  //         } 
  //       });
  //     });
  //   });
  // });

  // showCollectionDetails("Ryan Hoover Hunts");

  // $(".all-collections").on("click", ".single-collection-container", function() {
  //     var collectionId = $(this).attr("collection-id");
  //     console.log(collectionId);

  //     showCollectionDetails(collectionId);

  //   });

});
