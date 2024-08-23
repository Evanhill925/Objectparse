import dump
import pprint

dataTest = dump.dataThree

def banned_check(string,ban_list):
    for banned_word in ban_list:
        if banned_word in string:
            return True

def approved_fields(option_dic,good_fields):
    dict_you_want = {field: option_dic[field] for field in good_fields}
    return dict_you_want
        

def clean_options(options_array,good_fields):
    cleaned_array = []
    for option_dic in options_array:
        dict_you_want = {field: option_dic[field] for field in good_fields}
        cleaned_array.append(dict_you_want)
    return cleaned_array


def display(item):
    # print(i['id'])
    print(item['name'])
    # if not item['isOptional']:
    #     print('Required:')
    
    # might need this later if other stores don't work with chipolte settup
    # print(f"must choose {item['maxNumOptions']}")

    print(item['subtitle'])



def get_option_list(data):
    option_list = data['data']['itemPage']['optionLists']
    return option_list

    


def returnHellscape(data):
    # battle object demon
    option_list = get_option_list(data)

    print("number of objects in option list " + str( len(option_list)))
    banned_words = ['recommended','doubledash']


    for i in option_list:
        if not banned_check(i['id'],banned_words):
            display(i)
            print('--------------------------------------------')
           
            for option in i['options']:
                    print(option['name'])

                    for extra in option["nestedExtrasList"]:
                        display(extra)

                        for sub_extra in extra['options']:
                            print('-'+sub_extra['name'])

            print('--------------------------------------------')
        else:
            pass
            # print(i['id'])
            # print('optional')
            # print(i['name'])



        #find out if all the nested objects are identical
    def all_same_check():
        pass
        
    
    

def dict_scape(data):

    banned_words = ['recommended','doubledash']
    options = get_option_list(data)

    

    for i in options:
        if not banned_check(i['id'],banned_words):
            display(i)
            for option in i['options']:
                    print(option['name'])


                    for extra in option["nestedExtrasList"]:

                        my_fields = [
                            'name',
                            'subtitle',
                            'options'
                        ]
                        
                        extra_dict = approved_fields(extra,my_fields)
                        extra_dict['type'] =  'Optional' if extra['isOptional']  else 'Required'

                        

                        option_fields= ['id','name',]



                        extra_dict['options'] = clean_options(extra_dict['options'],option_fields)
                        # {'id': '2131030110', 'name': 'Guacamole', 'unitAmount': 0, 'currency': 'USD', 'displayString': '', 'decimalPlaces': 2, 'nextCursor': None, 'caloricInfoDisplayString': '230 cal', 'chargeAbove': 0, 'chargeAboveDisplayString': '', 'defaultQuantity': 0, 'dietaryTagsList': [{'type': 'DEFAULT', 'abbreviatedTagDisplayString': 'VG', 'fullTagDisplayString': None, '__typename': 'DietaryTag'}], 'optionTagsList': [], 'minOptionChoiceQuantity': None, 'maxOptionChoiceQuantity': None, 'imgUrl': 'https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/photosV2/8e63c5c4-b200-4c5c-ae4a-790a183a1283-retina-large.png', '__typename': 'FeedOption'},                        
                        pprint.pp(extra_dict)
    

dict_scape(dataTest)


# returnHellscape(dataTest)

