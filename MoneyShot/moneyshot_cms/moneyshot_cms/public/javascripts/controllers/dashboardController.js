angular.module('dashboardController', [])

  .controller('dashboardCtrl', dashboardCtrl);

  dashboardCtrl.$inject = ['allPhotos', 'submitPrice'];

  function dashboardCtrl(allPhotos, submitPrice){
    //////////////////////////////////
    ////////begin all global variables
    var self = this;
    self.currentTab = "allPhotos";///////////this can be set to "allPhotos", "soldPhotos", or "photoStream"
    self.yesNoPopupVariable = false;
    //////////end all global variables
    //////////////////////////////////
    console.log(submitPrice);

    ///////function to load all Photos
    allPhotos()
    .then(function(photoList){
      console.log(photoList);
      self.allPhotos = photoList.data.reverse();
      self.currentPhoto = self.allPhotos[0];
    })

    ////////////function to controler which tab is showing;
    self.tabController = function tabController(event){
      ///////function checks to see which tab you've clicked on (via the classname), and changes self.currentTab to trigger the html ng-if statements for each tab
      var targetClassStream = $(event.currentTarget).hasClass('photoCarouselTab');
      var targetClassAll = $(event.currentTarget).hasClass('photoAllTab');
      var targetClassSold = $(event.currentTarget).hasClass('photoSoldTab');
      if(targetClassStream){
        console.log('stream');
        self.currentTab = "photoStream";
      }
      else if(targetClassAll){
        console.log('all');
        self.currentTab = "allPhotos";
      }
      else if(targetClassSold){
        console.log('sold');
        self.currentTab = "soldPhotos";
      }
    }

    self.yesNoPopup = function(){
      self.yesNoPopupVariable = true;
    }


    /////////////functions to submit accepted photo, with price, to the database
    self.submitSuccessPhoto = function submitSuccessPhoto(){
      var price = $('.popupPrice').val();
      console.log(price);
      var photoId = $('.yesTab')[0].id
      console.log(photoId);
      submitPrice(photoId, price)
      .then(function(newPhoto){
        console.log(newPhoto);
      })
    }
  }
