var ridpApp =  angular.module('ridpApp', ['ui.router', 'ui.mask']);


ridpApp.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");
	$stateProvider.state('userInfo', {
		url : '/',
		templateUrl : 'html/userInfo.html',
		controller: 'userInfoCtrl',
	}).state('questionInfo', {
		templateUrl : 'html/questionInfo.html',
		controller: 'questionInfoCtrl',
	}).state('result', {
		templateUrl : 'html/result.html'
	});
	
});


ridpApp.directive('ssapDatepicker',function(){
	return {
		restrict : 'AE',
		
		link : function(scope, element, attrs) {		
			element.datepicker({
				autoclose: true
			});
		}
	};
});

ridpApp.controller('mainCtrl',function($scope, $state){
	$scope.userInfo = {};	
	$scope.questionInfo = {};
	
	$scope.answerInfo = {
			answers : {}
	};
	
	$scope.result = "";
	
	$scope.loading = false;
	
	var pageArray = [ 'userInfo', 'questionInfo', 'result' ];
	
	$scope.currentPage = 'userInfo';
	$scope.prevPage = pageArray[pageArray.indexOf($scope.currentPage) - 1];
	$scope.nextPage = pageArray[pageArray.indexOf($scope.currentPage) + 1];
	
	
	$scope.setPage = function(page){
		
		if($scope.currentPage == 'userInfo'){
			$scope.loading = true;
			
			$.ajax({
				type : "POST",
				url : "getRIDPQuestionnaire",
				data : JSON.stringify($scope.userInfo),
				contentType: 'application/json; charset=UTF-8',	
				success : function(response) {
					$scope.loading = false;
					console.log("response: "+response);
					$scope.questionInfo = JSON.parse(response);
					
					$scope.goToPage(page);
				},
				error : function(e) {
					//alert("Failed to Check RIDP Response");
					$scope.loading = false;
					$scope.questionInfo = [
					                       {
					                           "answers": [
					                               {
					                                   "text": "SANTA CLARA",
					                                   "value": 0
					                               },
					                               {
					                                   "text": "LASSEN",
					                                   "value": 1
					                               },
					                               {
					                                   "text": "ALPINE",
					                                   "value": 2
					                               },
					                               {
					                                   "text": "MADERA",
					                                   "value": 3
					                               },
					                               {
					                                   "text": "NONE OF THE ABOVE/DOES NOT APPLY",
					                                   "value": 4
					                               }
					                           ],
					                           "id": 1,
					                           "question": "Please select the county for the address you provided."
					                       },
					                       {
					                           "answers": [
					                               {
					                                   "text": "STANFORD",
					                                   "value": 0
					                               },
					                               {
					                                   "text": "PORTOLA VALLEY",
					                                   "value": 1
					                               },
					                               {
					                                   "text": "MOUNTAIN VIEW",
					                                   "value": 2
					                               },
					                               {
					                                   "text": "ATHERTON",
					                                   "value": 3
					                               },
					                               {
					                                   "text": "NONE OF THE ABOVE/DOES NOT APPLY",
					                                   "value": 4
					                               }
					                           ],
					                           "id": 2,
					                           "question": "According to our records, you previously lived on (CALIFORNIA). Please choose the city from the following list where this street is located."
					                       },
					                       {
					                           "answers": [
					                               {
					                                   "text": "NA",
					                                   "value": 0
					                               },
					                               {
					                                   "text": "LAIRD AND COMPANY",
					                                   "value": 1
					                               },
					                               {
					                                   "text": "CORNWALLIS ENTERPRISES",
					                                   "value": 2
					                               },
					                               {
					                                   "text": "FLEETSOURCE LEASING",
					                                   "value": 3
					                               },
					                               {
					                                   "text": "NONE OF THE ABOVE/DOES NOT APPLY",
					                                   "value": 4
					                               }
					                           ],
					                           "id": 3,
					                           "question": "Which of the following is a current or previous employer? If there is not a matched employer name, please select 'NONE OF THE ABOVE'."
					                       },
					                       {
					                           "answers": [
					                               {
					                                   "text": "DETROIT HIGH SCHOOL",
					                                   "value": 0
					                               },
					                               {
					                                   "text": "NORMANGEE HIGH SCHOOL",
					                                   "value": 1
					                               },
					                               {
					                                   "text": "FALLS CITY HIGH SCHOOL",
					                                   "value": 2
					                               },
					                               {
					                                   "text": "ORLAND HIGH SCHOOL",
					                                   "value": 3
					                               },
					                               {
					                                   "text": "NONE OF THE ABOVE/DOES NOT APPLY",
					                                   "value": 4
					                               }
					                           ],
					                           "id": 4,
					                           "question": "According to our records, you graduated from which of the following High Schools?"
					                       }
					                   ];
					
					$scope.goToPage(page);
				}
			});
		}else if($scope.currentPage == 'questionInfo'){
			$scope.loading = true;
			
			var data = [];
			var inputData = "";
			angular.forEach($scope.answerInfo.answers, function(value, key){
				data.push({
					'id' : key-1,
					'selectedAnswer' : parseInt(value)+1
				});
			});
			
			inputData = JSON.stringify(data);
			
			console.log(inputData);
			$.ajax({
				type : "POST",
				url : "submitRIDPAnswers",
				data : inputData,
				contentType: 'application/json; charset=UTF-8',
				success : function(response) {
					console.log("RIDP verification response: "+response);
					$scope.loading = false;
					$scope.result = response;
										
					$scope.goToPage(page);
				}
//				},
//				error : function(e) {
//					console.log("RIDP verfiication response: "+response);
//					$scope.loading = false;
//					$scope.result = response;
//					
//					$scope.goToPage(page);
//				}
			});
		}
		
		
		
		$scope.goToPage(page);
	};
	
	$scope.goToPage = function(page){
		$state.go(page);
		
		$scope.currentPage = page;
		$scope.prevPage = pageArray[pageArray.indexOf($scope.currentPage) - 1];
		$scope.nextPage = pageArray[pageArray.indexOf($scope.currentPage) + 1];
		
		$('.nav li').removeClass('active');
		$('.nav li').each(function(index){
			if(index == pageArray.indexOf($scope.currentPage)){
				$(this).addClass('active');
			}
		});
	};
});

ridpApp.controller('userInfoCtrl', function($scope){

});

ridpApp.controller('questionInfoCtrl', function($scope){
	
	
	
});