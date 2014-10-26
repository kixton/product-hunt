
var collections = {
  93526: [1301, 5090, 2701],
  13190: [10001, 9980, 2413],
  8660: [66, 76, 8160],
  94506: [66, 185, 1363, 408, 208, 177, 1429, 10035, 5197, 8919],
  // 2: [8977, 8710, 9980, 9997, 9996, 9948, 9957, 9934, 9819, 9695]
  // "My Survival Kit": {94506: [66, 185, 1363, 408, 208, 177, 1429, 10035, 5197, 8919]},
};


var relatedCollections = {
  "Ryan Hoover Favs" : ["Yo! Check It Out", "Designer Tools", "Fashion Hunt"],
  "Yo! Check It Out" : ["Ryan Hoover Favs", "Designer Tools", "Fashion Hunt"],
  "Designer Tools" : ["Yo! Check It Out", "Stock Photography", "Fashion Hunt"],
  "Stock Photography" : ["Yo! Check It Out", "Designer Tools", "Fashion Hunt"],
  "Fashion Hunt" : ["Yo! Check It Out", "Designer Tools", "Stock Photography"]
};

var masterCollections = {
  "Snoop Dog <3 Gifs" : {24656: [6930, 8950, 8466, 8375, 7914, 7193, 9672, 7228, 2788, 1503, 9417, 2887]},
  "Ryan Hoover Favs" : {2: [8977, 8710, 9980, 9997, 9996, 9948, 9957, 9934, 9819, 9695]},
  "Yo! Check It Out" : { 13384: [3486, 4897, 9695, 9033, 5918, 4828, 4500, 4871, 5021]},
  "Designer Tools" : {13190: [8164, 3697, 9311, 2144, 9098, 2758, 4384, 2733, 9512, 9118]},
  "Stock Photography" : { 8319: [2480, 9622, 7140, 4157, 5732, 1882, 4850, 5144, 4199]},
  "Fashion Hunt" : {93526: [1301, 5090, 2701, 5875, 3586, 7949, 7404, 4876, 8454, 9113]},
};

var baseUrl = "/api/";


var getSingleItem = function(productId, userId) {
  $.ajax({
    type: 'GET',
    url: baseUrl + '?url=v1/posts/' + productId,
    dataType: 'json',  
    success: function(json_results) {
      var source = $("#collection-template").html();
      var template = Handlebars.compile(source);
      var newHTML = template(json_results.post);
      // (tbu) refactor, use database to store collection names; use collection-id as UID
      var idToAppend = "#" + userId ;

      $(".all-collections").find(idToAppend).append(newHTML);
     }
  });
};


var getUserInfo = function(userId, collectionName, hollaback) {
  $.ajax({
    type: 'GET',
    url: baseUrl + '?url=v1/users/' + userId,
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
    $.each( collection[userId] , function(index, productId) {
      console.log(productId);
    })
  }
};

var getUserAvatar = function(userId, hollaback) {
  $.ajax({
    type: 'GET',
    url: baseUrl + '?url=v1/users/' + userId,
    dataType: 'json',  
    success: function(json_results) {
      console.log(json_results);
      hollaback();
     }
  });
};

var getProductInfo2 = function(productId) {
  $.ajax({
    type: 'GET',
    url: baseUrl + '?url=v1/posts/' + productId,
    dataType: 'json',  
    success: function(json_results) {
      // console.log(json_results);
      var source = $("#single-collection-details-template").html();
      var template = Handlebars.compile(source);
      var newHTML = template(json_results.post);

      $(".collection-products").append(newHTML);
     }
  });
};

$(document).ready(function() {
  console.log("doc ready");
  $(".single-collection-details").hide();
  $(".all-collections").show();

  $.each(masterCollections, function(collectionName, collectionInfo) {
    $.each(collectionInfo, function(userId, collectionArray) {

      getUserInfo(userId, collectionName, function() {
        $.each(collectionArray, function(index, productId) {
          if ( index < 9 ) {
            getSingleItem(productId, userId);
          } 
        });
      });
    });
  });

  $(".all-collections").on("click", ".single-collection-container", function() {
      $(".all-collections").hide();
      $(".single-collection-details").show();
      var collectionId = $(this).attr("collection-id");
      showCollectionDetails(collectionId);
      $(".collection-title-lg").append(collectionId);
      var singleCollection = masterCollections[collectionId];
      console.log(singleCollection);

      var collectionArray;

      for (var userId in singleCollection) {
        console.log(userId);
        collectionArray = singleCollection[userId];
        console.log(collectionArray.length);
        $(".collection-count").append(collectionArray.length);
        // API request to get user info
      }

      $.each(collectionArray, function(index, productId) {
        getProductInfo2(productId);
      });

      var relatedArray = relatedCollections[collectionId];
      $.each(relatedArray, function(index, relatedCollectionName) {
        console.log(relatedCollectionName);
        var divToAppend = "<div class='related-collections-plain'>" + relatedCollectionName + "</div>";
        $(".related-collections-container").append(divToAppend);


      });

    });

});

var clickSingleCollection = function() {
  // get collectionName

  var collectionName = "Ryan Hoover Favs";
  var singleCollection = masterCollections['Ryan Hoover Favs'];
  $(".collection-title-lg").append(collectionName);
  console.log(singleCollection);

  var collectionArray;

  for (var userId in singleCollection) {
    console.log(userId);
    collectionArray = singleCollection[userId];
    console.log(collectionArray.length);
    $(".collection-count").append(collectionArray.length);
    // API request to get user info
  }

  $.each(collectionArray, function(index, productId) {
    getProductInfo2(productId);
  });

  var relatedArray = relatedCollections[collectionName];
  $.each(relatedArray, function(index, relatedCollectionName) {
    console.log(relatedCollectionName);
    var divToAppend = "<div class='related-collections-plain'>" + relatedCollectionName + "</div>";
    $(".related-collections-container").append(divToAppend);

    // ran out of time for this...
    // var collectionObject = masterCollections[relatedCollectionName];
    // console.log(collectionObject);
    // for (var key in collectionObject) {
    //   console.log(key);
    //   // look up user avatar based on key
    //   getUserAvatar(key, function(data) {
    //     console.log(data);
    //   });
    // }

  });
}
