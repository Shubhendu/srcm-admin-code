var gridApp = angular.module('gridApp',['ngAnimate','ui.grid','ui.bootstrap','ui.grid.pagination','isteven-multi-select']);




gridApp.controller('roleGridController',function($scope,$http,$modal,$log,$window){
	$scope.showAddUser = false;
	$scope.isCollapsed = false;
	$scope.addRowPopUp = '<div><a id="addUser" ng-click="$event.stopPropagation();getExternalScopes().onClick(row.entity);">Add User</a> </div </div>'
	$scope.deleteRole = '<div>	<a id="deleteLink" ng-click="$event.stopPropagation();getExternalScopes().deleteRow(row.entity);">Delete</a> </div>';
   
	$scope.outputBrowsers = [];
    $scope.clickHandler = {
    		  onClick : function(value){
    			  console.log('Deleted role: '+value.roleName);
    		  },
    		  
    		  deleteRow:function(value){
    			  console.log('Name: '+value.roleName);
    			  
    			   $http.post('/admin/deleteRole', JSON.stringify(value)).
    		          success(function(result, status, headers, config) {
    		        	  console.log('Deleted role: '+value.roleName);
    		        	  $window.location.reload();
    		          }).
    		          error(function(result, status, headers, config) {
    		        	  console.log('Failed to Delet role: '+value.roleName);
    		          });
    		  }
    		};

	$scope.roleGridOptions = {
    	enableSorting: true,
    	enableRowSelection: true,
    	enableFiltering: true,
    	enablePaginationControls: false,
        paginationPageSize: 5,
    	columnDefs: [
		      { field: 'id'},//,cellClass: 'grid-center-align' },
		      { field: 'roleName' },
		      { field: 'active', enableSorting: false },
		      { field: 'creationTimeStamp', enableSorting: false,cellFilter : 'date' },
		      { field: 'lastUpdatedTimeStamp', enableSorting: false,cellFilter : 'date' },
		      { name:' ',displayName:'Add User',cellTemplate: $scope.addRowPopUp,enableSorting: false,enableFiltering:false},
		      { name:'  ',displayName:'Delete Role',cellTemplate: $scope.deleteRole,enableSorting: false,enableFiltering:false}
    	],
	    onRegisterApi: function( gridApi ) {
	      $scope.gridApi = gridApi;
	    }
	   	
    };
	$scope.allRolesData =[];
	
	$http.get('/admin/getAllRoles').
	  success(function(data, status, headers, config) {
		  console.log(data);
		  $scope.roleGridOptions.data = data;
		  $scope.allRolesObjects = data;
		  
		  for (i = 0,len = data.length; i < len; i++) { 
			  	var selectObj = {
			  			'name' : data[i].roleName ,
			  			'id' : data[i].id,
			  			'maker' : data[i].roleName  ,
			  			'ticked' : false 
			  	}
			  	$scope.allRolesData.push(selectObj);
			    
			}
		 
	  }).
	  error(function(data, status, headers, config) {
	  console.log("Failure");
	  });
	
	
	
	$scope.reload= function(){
		$window.location.reload();
	}
      
      $scope.openAddRole = function (size) {

    	    var modalInstance = $modal.open({
    	      templateUrl: 'myModalContent.html',
    	      controller: 'ModalInstanceCtrl',
    	      size: size,
    	      resolve: {
    	        items: function () {
    	          return $scope.items;
    	        }
    	      }
    	    });

    	    modalInstance.result.then(function (selectedItem) {
    	      $scope.selected = selectedItem;
    	    }, function () {
    	      $log.info('Modal dismissed at: ' + new Date());
    	    });
    	  };
      
});



gridApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, $log,$http,$window) {
	 
	  
	  $scope.save = function(role) {
	        console.log("role name is: "+JSON.stringify(role));
	        
	     // Simple POST request example (passing data) :
	        $http.post('/admin/addRole', JSON.stringify(role)).
	          success(function(result, status, headers, config) {
	        	  $modalInstance.dismiss('cancel');
	        	  $window.location.reload();
	          }).
	          error(function(result, status, headers, config) {
	            console.log('Failed to add role');
	          });
	      };
	      
	 

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
	});

gridApp.controller('userGridController',function($scope,$http,$log,$window,$modal){
	$scope.showAddUser = false;
	$scope.userDetailsGridOptions = {
	    	enableSorting: true,
	    	enableFiltering: true,
	    	columnDefs: [
			      { field: 'id',enableFiltering:false },
			      { field: 'firstName' },
			      { field: 'middleName' },
			      { field: 'lastName' },
			      { field: 'roleNames' },
			      { field: 'creationDate', enableSorting: false,cellFilter : 'date' },
			      { field: 'lastUpdatedDate', enableSorting: false,cellFilter : 'date' }
	    	],
		    onRegisterApi: function( gridApi ) {
		      $scope.gridApi = gridApi;
		    },
		   	
	    };
	
	$scope.allUsersData =[];
	
	$http.get('/admin/getAllUsers').
	  success(function(data, status, headers, config) {
		  console.log(data);
		  $scope.userDetailsGridOptions.data = data;
		  $scope.allUsersObjects = data;
		  
	 	  for (i = 0,len = data.length; i < len; i++) { 
	 		  	var selectObj = {
	 		  			'name' : data[i].firstName ,
	 		  			'id' : data[i].id,
	 		  			'maker' : data[i].firstName + ' ' + data[i].lastName  ,
	 		  			'ticked' : false 
	 		  	}
	 		  	$scope.allUsersData.push(selectObj);
	 		    
	 		}
		  
	  }).
	  error(function(data, status, headers, config) {
	  console.log("Failure");
	  });

	
		
		$scope.reload= function(){
			$window.location.reload();
		}
	      
	      $scope.openAddUser = function (size) {

	    	    var modalInstance = $modal.open({
	    	      templateUrl: 'addUserModalContent.html',
	    	      controller: 'UserModalInstanceCtrl',
	    	      size: size,
	    	      resolve: {
	    	        items: function () {
	    	          return $scope.items;
	    	        }
	    	      }
	    	    });

	    	    modalInstance.result.then(function (selectedItem) {
	    	      $scope.selected = selectedItem;
	    	    }, function () {
	    	      $log.info('Modal dismissed at: ' + new Date());
	    	    });
	    	  };
});

gridApp.controller('UserModalInstanceCtrl', function ($scope, $modalInstance, $log,$http,$window) {
	
	 $scope.saveUser = function(user) {
	        console.log("User name is: "+JSON.stringify(user));
	        
	     // Simple POST request example (passing data) :
	        $http.post('/admin/addUser', JSON.stringify(user)).
	          success(function(result, status, headers, config) {
	        	  $modalInstance.dismiss('cancel');
	        	  $window.location.reload();
	          }).
	          error(function(result, status, headers, config) {
	            // called asynchronously if an error occurs
	            // or server returns response with an error status.
	          });
	      };
	      
	 

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
});

gridApp.controller('userRoleMappingController',function($scope,$http,$log,$window){
	
	
	
	 $scope.status = {
			    isopen: true
			  };
	 
	 $http.get('/admin/getAllUsers').
	 success(function(data, status, headers, config) {
	 	  console.log(data);
	 	  $scope.allUsersData =[];
	 	  for (i = 0,len = data.length; i < len; i++) { 
	 		  	var selectObj = {
	 		  			'name' : data[i].firstName ,
	 		  			'id' : data[i].id,
	 		  			'maker' : data[i].firstName + ' ' + data[i].lastName  ,
	 		  			'ticked' : false 
	 		  	}
	 		  	$scope.allUsersData.push(selectObj);
	 		    
	 		}
	 	  
	 }).
	 error(function(data, status, headers, config) {
	 console.log("Failure");
	 });
	 
	 $scope.allRolesData = [];
	 
	 $http.get('/admin/getAllRoles').
	  success(function(data, status, headers, config) {
		  console.log(data);
		  for (i = 0,len = data.length; i < len; i++) { 
			  	var selectObj = {
			  			'name' : data[i].roleName ,
			  			'id' : data[i].id,
			  			'maker' : data[i].roleName  ,
			  			'ticked' : false 
			  	}
			  	$scope.allRolesData.push(selectObj);
			    
			}
	  }).
	  error(function(data, status, headers, config) {
	  console.log("Failure");
	  });
	 $scope.alerts = [
	                  
	                ];
	
	 
	 $scope.addUserRoleMapping = function(){
		 
		 var roleId =[];
		 var userId =[]; 
		 
		 angular.forEach( $scope.selectedRoles, function( value, key ) {    
			    roleId.push(value.id)
			});
		 
		 angular.forEach( $scope.selectedUsers, function( value, key ) {    
			 userId.push(value.id);
			});
		 
		 var inputMap = {
				 'roleIds' : roleId,
				 'userIds' : userId
		 };
		 
		 console.log(JSON.stringify(inputMap));
		 
		 $http.post('/admin/addUserRoleMapping', JSON.stringify(inputMap)).
         success(function(result, status, headers, config) {
        	 $scope.alerts.push({ type: 'success', msg: 'Role User Mapping completed successfullly !!' });
       	  	 console.log('Success ');
         }).
         error(function(result, status, headers, config) {
        	 $scope.alerts.push({ type: 'danger', msg: 'Role User Mapping failed !!' });
           // called asynchronously if an error occurs
           // or server returns response with an error status.
         });
	 }
	 
	 
	$scope.addUserToRole = function(){
		console.log('allRoles: '+angular.toJson($scope.allRolesObjects));
	};
	$scope.toggled = function(open) {
	    $log.log('Dropdown is now: ', open);
	  };
	  
	  $scope.closeAlert = function(index) {
		    $scope.alerts.splice(index, 1);
		    $window.location.reload();
		  };

	  $scope.toggleDropdown = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	    $scope.status.isopen = !$scope.status.isopen;
	  };
	
});


gridApp.controller('seminarUserMappingController',function($scope,$http,$log,$window){
	
	
	
	 $scope.status = {
			    isopen: true
			  };
	 
	 
	 $http.get('/admin/getAllSeminars').
	 success(function(data, status, headers, config) {
	 	  console.log(data);
	 	  $scope.allSeminarData =[];
	 	  for (i = 0,len = data.length; i < len; i++) { 
	 		  	var selectObj = {
	 		  			'name' : data[i].title ,
	 		  			'id' : data[i].seminarId,
	 		  			'maker' : data[i].title + ' ' + data[i].desc  ,
	 		  			'ticked' : false 
	 		  	}
	 		  	$scope.allSeminarData.push(selectObj);
	 		    
	 		}
	 	  
	 }).
	 error(function(data, status, headers, config) {
	 console.log("Failure");
	 });
	 
	 
	 $http.get('/admin/getAllUsers').
	 success(function(data, status, headers, config) {
	 	  console.log(data);
	 	  $scope.allUsersData =[];
	 	  for (i = 0,len = data.length; i < len; i++) { 
	 		  	var selectObj = {
	 		  			'name' : data[i].firstName ,
	 		  			'id' : data[i].id,
	 		  			'maker' : data[i].firstName + ' ' + data[i].lastName  ,
	 		  			'ticked' : false 
	 		  	}
	 		  	$scope.allUsersData.push(selectObj);
	 		    
	 		}
	 	  
	 }).
	 error(function(data, status, headers, config) {
	 console.log("Failure");
	 });
	 
	 $scope.allRolesData = [];
	 
	 $http.get('/admin/getAllRoles').
	  success(function(data, status, headers, config) {
		  console.log(data);
		  for (i = 0,len = data.length; i < len; i++) { 
			  	var selectObj = {
			  			'name' : data[i].roleName ,
			  			'id' : data[i].id,
			  			'maker' : data[i].roleName  ,
			  			'ticked' : false 
			  	}
			  	$scope.allRolesData.push(selectObj);
			    
			}
	  }).
	  error(function(data, status, headers, config) {
	  console.log("Failure");
	  });
	 $scope.alerts = [
	                  
	                ];
	
	 
	 $scope.addSeminarRoleMapping = function(){
		 
		 var seminarIds =[];
		 var roleId =[];
		 var userId =[]; 
		 
		 angular.forEach( $scope.selectedSeminar, function( value, key ) {    
			 seminarIds.push(value.id)
			});
		 
		 angular.forEach( $scope.selectedRoles, function( value, key ) {    
			    roleId.push(value.id)
			});
		 
		 angular.forEach( $scope.selectedUsers, function( value, key ) {    
			 userId.push(value.id);
			});
		 
		 var inputMap = {
				 'seminarIds':seminarIds,
				 'roleIds' : roleId,
				 'userIds' : userId
		 };
		 
		 console.log(JSON.stringify(inputMap));
		 
		 $http.post('/admin/addSeminarUserRoleMapping', JSON.stringify(inputMap)).
        success(function(result, status, headers, config) {
       	 $scope.alerts.push({ type: 'success', msg: 'Seminar Role User Mapping completed successfullly !!' });
      	  	 console.log('Success ');
        }).
        error(function(result, status, headers, config) {
       	 $scope.alerts.push({ type: 'danger', msg: 'Seminar Role User Mapping failed !!' });
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
	 }
	 
	 
	$scope.addUserToRole = function(){
		console.log('allRoles: '+angular.toJson($scope.allRolesObjects));
	};
	$scope.toggled = function(open) {
	    $log.log('Dropdown is now: ', open);
	  };
	  
	  $scope.closeAlert = function(index) {
		    $scope.alerts.splice(index, 1);
		    $window.location.reload();
		  };

	  $scope.toggleDropdown = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	    $scope.status.isopen = !$scope.status.isopen;
	  };
	
});