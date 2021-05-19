import {LocalStorage} from 'quasar';

export default async({Vue, store}) => {
	const local = {
		async get(key, data){
			try {
				var checkKeyExist = LocalStorage.has(key);

				if(checkKeyExist){
					return LocalStorage.getItem(key);
				} else {
					if(data){
						LocalStorage.set(key, data);
						return data;
					} else {
						return [];
					}
				}
			} catch(e){
				console.log('Error on getting local stroage');
			}
		},
		async update(key, data){
			try {
				if(key.includes('.')){
					var splitKey = key.split('.');
					var tempObj = {};

					splitKey.forEach((index, key) => {
						if(key === 0) {
							tempObj = LocalStorage.getItem(index);
						} else {
							switch(index){
								case 'array':
									tempObj.forEach((index2, key2) => {
										if(index2.id === data.id){
											tempObj[key2] = data;
										}
									});
									break;
								default:
									tempObj[index].forEach((index2, key2) => {
										if(index2.id === data.id){
											if(data.fromTable){
												delete data.fromTable;
											}
											tempObj[index][key2] = data;
										}
									});
									break;
							}
						}
					});
					LocalStorage.set(splitKey[0], tempObj);
				} else {
					LocalStorage.set(key, data);
				}
			} catch(e){
				console.log('Error on updating local storage');
			}
		}
	};

	local.Vue = Vue;

	Vue.prototype.$local = local; 
};