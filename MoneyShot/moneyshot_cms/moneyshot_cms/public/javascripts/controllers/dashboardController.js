angular.module('dashboardController', [])

  .controller('dashboardCtrl', dashboardCtrl);

  dashboardCtrl.$inject = ['$http','allPhotos', 'submitPrice'];

  function dashboardCtrl($http, allPhotos, submitPrice){
    //////////////////////////////////
    ////////begin all global variables
    var self = this;
    self.currentTab = "allPhotos";///////////this can be set to "allPhotos", "soldPhotos", or "photoStream"
    self.yesNoPopupVariable = false;
    //////////end all global variables
    //////////////////////////////////

    ///////function to load all Photos
    allPhotos()
    .then(function(photoList){
      self.allPhotos = photoList.data.reverse();
      //////lets add all the sold photos to it's own array
      console.log('P',self.allPhotos);
      self.soldPhotos = []
      for (var i = 0; i < self.allPhotos.length; i++) {
        if(self.allPhotos[i].status == 'sold'){
          self.soldPhotos.push(self.allPhotos[i]);
          console.log('Added', self.soldPhotos);
          // self.allPhotos[i].slice(i, 1);

        }
      }
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
    self.submitSuccessPhoto = function submitSuccessPhoto(photoId){
      var price = $('.popupPrice').val();
      console.log(price);
      console.log(photoId);
      submitPrice(photoId, price)
      .then(function(newPhoto){
        console.log(newPhoto);
        self.soldPhotos.push(newPhoto.data);
        console.log(self.soldPhotos);
        self.yesNoPopupVariable = false;
        //////function to slice out the photo from the allphotos array
        for (var i = 0; i < self.allPhotos.length; i++) {
          if(self.allPhotos[i]._id == photoId){
            console.log(self.allPhotos);
            self.allPhotos.splice(i, 1);
            console.log(self.allPhotos);
          }
        }
        self.currentPhoto = self.allPhotos[0];
      })
    }

    /////close popup
    self.closePopup = function(){
      self.yesNoPopupVariable = false;
    }

    //////////function to click on a photo to open the photo Popup modal
    self.submitPhoto = function(photo){
      currentPhotoFunc(photo);
      self.yesNoPopupVariable = true;
    }

    function currentPhotoFunc(photo){
      //////photo is the whole photo object
      self.currentPhoto = photo;
      self.yesNoPopupVariable = true;
    }
    self.currentPhotoFunc = currentPhotoFunc;
  }
