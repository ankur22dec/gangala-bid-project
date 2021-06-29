import requests
import json

print('\n 1. Login in Odoo and get access tokens:')
r = requests.get(
    'http://172.105.36.229:8069/api/auth/get_tokens?username=admin&password=admin&access_lifetime=0',
    #verify = False      # for self-signed TLS/SSL certificates
)
print(r.text)
access_token = r.json()['access_token']


row_product_list = [
    {
        "name" : "Perfect Strike SCOREBOOK with Rules and Scoring Instructions : Heavy Duty. Great for Baseball and Softball.",
        # "manufacturer_pref" : "B01686BLDY",
        # "manufacturer_purl" : "https://www.amazon.in/VIGOROSO-Children-Transformers-Bumblebee-Wristwatch/dp/B01686BLDY", 
        # "manufacturer" : "VIGOROSO", 
        # "mpn" : "W783.L", 
        # "main_image_link" : "https://images-na.ssl-images-amazon.com/images/I/61ic4xwLK-L._UL1005_.jpg", 
        # "images_row" : "https://images-na.ssl-images-amazon.com/images/I/61ic4xwLK-L._UL1005_.jpg|https://images-na.ssl-images-amazon.com/images/I/51u6rz-8DpL.jpg|https://images-na.ssl-images-amazon.com/images/I/51IcIhNH%2BCL.jpg|https://images-na.ssl-images-amazon.com/images/I/51tfRb7kJUL.jpg|https://images-na.ssl-images-amazon.com/images/I/51HDaJemkwL.jpg|https://images-na.ssl-images-amazon.com/images/I/61etmgvZAdL._UL1091_.jpg", 
        "sequence": 1,
        "product_brand_id" : "Perfect Strike",
        "rating_avg" : 4.0,
        "description" : "VIGOROSO Boys Children Kids Digital Pu Watch Transformers Bumblebee Cartoon Wristwatch (Blue Band),VIGOROSO", 
        "description_purchase": "purchase",
        "description_sale" : "<br>Condition: 100% Brand new <br> <br>Case Material: PU Case <br>Band Material: PU Rubber <br> <br>Features: <br>1. Digital display. <br>2. Comfortable watchband with classic color. <br>3. Robot can be removed. <br>4. Best gift for Boy's/Girls/Kids/Students. <br>5. Color: Yellow, Blue, Red, Gray. <br> <br>Specification(Approx): <br>Case Diameter: 4.2 cm <br>Case Thickness: 1.6 cm <br>Band Length: 22.2 cm <br>Band Width: 1.5 cm <br> <br>Maximum wrist circumference: 20.5 cm <br>Minimum wrist circumference: 15.0 cm <br> <br>You will get: 1 * Wristwatch <br>", 
        "type": "consu",
        "purchase_line_warn": "no-message",
        "sale_line_warn": "no-message",
        "tracking": "none",
        "list_price":1839,
        "volume": 0.0,
        "weight" : 0.05,
        "public_categ_ids" : "Sports",
        "categ_id": "testing",
        "uom_id": "demo-unit",
        "uom_po_id": "demo-unit",
        "default_code": "1510 211",
        "service_type": "manual",
        "expense_policy": "no",
        "invoice_policy": "order",
        "inventory_availability": "never",
        "active": True,
        "sale_ok": True,
        "purchase_ok": True,
        "is_published": True,
        "rental": False,
        "mp_display": False,
        "is_global_product": False,
        "can_image_1024_be_zoomed": False,
        "has_configurable_attributes": False,
    }
]

row_data_list_product = [
    {
       "product_id": '_product_import_._sports fitness  outdoors_B07QSB5RMH',
       "lst_price": 2797,
       "product_quantity": 1
     }
]

for datas in row_data_list_product:
    test = datas.get('product_id').split('.')
    product_id = [('module', '=', test[0]),('name', '=', test[1])]
    res = requests.get(
    "http://172.105.36.229:8069/api/ir.model.data?filters="+str(product_id),
    headers = {'Access-Token': access_token},
    )
    if res.json().get('count') == 0:
        for category in row_product_list:
            if category.get('product_brand_id'):
                    '''
                        Chcek product_brand_id from product data.
                    '''
                    product_brand_id = [('name', '=', category.get('product_brand_id'))]
                    res_product_brand = requests.get(
                                "http://172.105.36.229:8069/api/product.brand?filters="+str(product_brand_id),
                                 headers = {'Access-Token': access_token},
                                )
                    print(res_product_brand)
                    if res_product_brand.json().get('count') == 0:
                        row_product_brand = [
                                            {
                                                "name": category.get('product_brand_id'),
                                            }
                                        ]
                        res_product_brand_id = requests.post(
                                    "http://172.105.36.229:8069/api/product.brand",
                                    headers = {
                                        'Content-Type': 'text/html; charset=utf-8',
                                        'Access-Token': access_token
                                    },data = json.dumps(row_product_brand))
                        print(res_product_brand_id)
                        category.update(product_brand_id = res_product_brand_id.json()[0].get('id'))
                    else:
                        category.update(product_brand_id = res_product_brand.json().get('results')[0].get('id'))
                        
            print("Chcek public_categ_ids from product data.")

            if category.get('public_categ_ids'):
                
                print("Chcek public_categ_ids from product data.")
                
                public_categ_ids = [('name', '=', category.get('public_categ_ids'))]
                res_public_categ = requests.get(
                            "http://172.105.36.229:8069/api/product.public.category?filters="+str(public_categ_ids),
                             headers = {'Access-Token': access_token},
                            )
                
                print("public id cat ")
                print(res_public_categ.json())
                if res_public_categ.json().get('count') == 0:
                    row_public_category_list = [
                                        {
                                            "name": category.get('public_categ_ids'),
                                        }
                                    ]
                    res_public_categ_id = requests.post(
                                "http://172.105.36.229:8069/api/product.public.category",
                                headers = {
                                    'Content-Type': 'text/html; charset=utf-8',
                                    'Access-Token': access_token
                                },data = json.dumps(row_public_category_list))
                    category.update({"public_categ_ids": [
                                        {"id":res_public_categ_id.json()[0].get('id'),},
                                    ]})
                else:
                    category.update({"public_categ_ids": [
                                        {"id":res_public_categ.json().get('results')[0].get('id'),},
                                    ]})

            if category.get('categ_id'):
                '''
                    Chcek category_id from product data.
                '''
                category_id = [('name', '=', category.get('categ_id'))]
                res_categ = requests.get(
                            "http://172.105.36.229:8069/api/product.category?filters="+str(category_id),
                             headers = {'Access-Token': access_token},
                            )
                if res_categ.json().get('count') == 0:
                    row_category_list = [
                                        {
                                            "name": category.get('categ_id'),
                                        }
                                    ]
                    res_categ_id = requests.post(
                                "http://172.105.36.229:8069/api/product.category",
                                headers = {
                                    'Content-Type': 'text/html; charset=utf-8',
                                    'Access-Token': access_token
                                },data = json.dumps(row_category_list))
                    category.update(categ_id = res_categ_id.json()[0].get('id'))
                else:
                    category.update(categ_id = res_categ.json().get('results')[0].get('id'))

            if category.get('uom_id'):
                '''
                    Chcek uom_id & uom_po_id from product data.
                '''
                uom_id = [('name', '=', category.get('uom_id'))]
                res_uom = requests.get(
                            "http://172.105.36.229:8069/api/uom.uom?filters="+str(uom_id),
                             headers = {'Access-Token': access_token},
                            )
                if res_uom.json().get('count') == 0:
                    row_uom_list = [
                                    {
                                        "name": category.get('uom_id'),
                                        "category_id": "liquid",
                                    }
                                ]
                    for uom_categ in row_uom_list:
                        '''
                            Chcek uom_categ_id from Uom data.
                        '''
                        uom_categ_id = [('name', '=', uom_categ.get('category_id'))]
                        res_uom_categ = requests.get(
                            "http://172.105.36.229:8069/api/uom.category?filters="+str(uom_categ_id),
                             headers = {'Access-Token': access_token},
                            )
                        if res_uom_categ.json().get('count') == 0:
                            row_uom_category_list = [
                                                {
                                                    "name": uom_categ.get('category_id'),
                                                }
                                            ]
                            res_uom_categ_id = requests.post(
                                        "http://172.105.36.229:8069/api/uom.category",
                                        headers = {
                                            'Content-Type': 'text/html; charset=utf-8',
                                            'Access-Token': access_token
                                        },data = json.dumps(row_uom_category_list))
                            uom_categ.update(category_id = res_uom_categ_id.json()[0].get('id'))
                        else:
                            uom_categ.update(category_id = res_uom_categ.json().get('results')[0].get('id'))

                    res_uom_id = requests.post(
                                "http://172.105.36.229:8069/api/uom.uom",
                                headers = {
                                    'Content-Type': 'text/html; charset=utf-8',
                                    'Access-Token': access_token
                                },data = json.dumps(row_uom_list))
                    category.update({"uom_id": res_uom_id.json()[0].get('id'),
                                     "uom_po_id": res_uom_id.json()[0].get('id'),
                                    })
                else:
                    category.update({"uom_id": res_uom.json().get('results')[0].get('id'),
                                     "uom_po_id": res_uom.json().get('results')[0].get('id'),
                                    })
                    
                    
        print("this is object")
        print(row_product_list)
        # res_prod = requests.post(
        # "http://172.105.36.229:8069/api/product.product",
        # headers = {
        #     'Content-Type': 'text/html; charset=utf-8',
        #     'Access-Token': access_token
        # },data = json.dumps(row_product_list))
        # for prod_id in res_prod.json():
        #     row_identifier_list = [
        #         {
        #             "module": test[0],
        #             "name": test[1],
        #             "noupdate": True,
        #             "display_name": "Test Product",
        #             "model": "product.product",
        #             "res_id": prod_id.get('id'),
        #         }
        #     ]
        #     res_model = requests.post(
        #     "http://172.105.36.229:8069/api/ir.model.data",
        #     headers = {
        #         'Content-Type': 'text/html; charset=utf-8',
        #         'Access-Token': access_token
        #     },data = json.dumps(row_identifier_list))
        #     datas.update(product_id = prod_id.get('id'))
    else:
        datas.update(product_id = res.json().get('results')[0].get('res_id'))

print('\n 2. reverse.auction.product - Create:',row_product_list)

print('\n 2. reverse.auction.product - Create:',row_data_list_product)
r_product = requests.post(
    "http://172.105.36.229:8069/api/reverse.auction.product",
    headers = {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Token': access_token
    },data = json.dumps(row_data_list_product))
print(r_product.text)
r_product_id = r_product.json()[0]

row_data_list = [
    {  
        "name" : "Script Reverse Auction",
        # "mern_uuid" : "123-2453-uuid",
        "partner_id" : "Auction-user", 
        "buyer_billing_id" : {
                                "street":'309, City Center Arcade, Nr. ST Bus Station, Krishnanagar, Nava Naroda',
                                "street2":'ahmedabad',
                                "city":'Ahmedabad',
                                "zip":'380001',
                            },
        "buyer_shipping_id" : {
                                "street":'309, City Center Arcade, Nr. ST Bus Station, Krishnanagar, Nava Naroda',
                                "street2":'ahmedabad',
                                "city":'Ahmedabad',
                                "zip":'380001',
                            },
        "max_distance" : 10,
        "reserve_price" : 100.00,
        "hide_sellers_bid" : False,
        "unlock_bids" : False,
        "auction_end_date" : "2021-05-27 12:00:00",
        "auction_start_date" : "2021-05-27 12:00:00",
        "planned_date" : "2021-05-27 12:00:00",
        "auction_product_type" : "stockable",
        "state" : "draft",
        "buyer_msg" : "Script Reverse Auction Description",
        "auction_products" : [
            {
               "id":r_product_id.get('id'),
            },
        ],
    }
]

print('\n 3. reverse.auction - Create:')

for data_list in row_data_list:
    '''
        Check partner_id for Auction data.
    '''
    partner_id = [('name', '=', data_list.get('partner_id'))]
    res_partner = requests.get(
        "http://172.105.36.229:8069/api/res.partner?filters="+str(partner_id),
        headers = {'Access-Token': access_token},
        )
    print(res_partner.text)
    if res_partner.json().get('count') == 0:
        row_data_partner_list = [
            {
                "name": data_list.get('partner_id'),
                "active": True,
                "is_company": True,
                "company_type": "person",
                "type": "contact",
                "auto_approve_qty": False, 
                "auto_product_approve": False, 
                "can_publish": True, 
                "claim_sms_sent": False, 
                "cloud": False, 
                "is_published": True, 
                "seller": False, 
                "verified_phone": False, 
                "website_published": True,
                "display_name": data_list.get('partner_id'),
                "street": "309, City Center Arcade, Nr. ST Bus Station, Krishnanagar, Nava Naroda",
                "city":'Ahmedabad',
                "zip": "380001", 
                "email": "sellerScript@gmail.com", 
                "mobile": "**********",  
                "profile_url": "https://www.crushpixel.com/big-static15/preview4/fotoeventis-2081298.jpg",  
                "cloud_state": "new",  
                "coordinate_calc": "by_addr", 
                "invoice_warn": "no-message", 
                "ks_time_format": "hour24", 
                "lang": "en_US", 
                "picking_warn": "no-message", 
                "purchase_warn": "no-message", 
                "sale_warn": "no-message", 
                "state": "new", 
                "trust": "normal", 
                "tz": "Asia/Calcutta", 
                "child_ids":[
                            {
                                "type":'delivery',
                                "street": data_list.get('buyer_shipping_id').get('street'),
                                "street2": data_list.get('buyer_shipping_id').get('street2'),
                                "city": data_list.get('buyer_shipping_id').get('city'),
                                "zip":data_list.get('buyer_shipping_id').get('zip'),
                                "email": "sellerScript@gmail.com", 
                                "mobile": "**********",
                            },
                ],
            }
        ]

        res_partner_id = requests.post(
        "http://172.105.36.229:8069/api/res.partner",
        headers = {
            'Content-Type': 'text/html; charset=utf-8',
            'Access-Token': access_token
        },data = json.dumps(row_data_partner_list))
        data_list.update({
                            "partner_id": res_partner_id.json()[0].get('id'),
                            "buyer_billing_id": res_partner_id.json()[0].get('id'),
                            "buyer_shipping_id": res_partner_id.json()[0].get('id'),
                        })
    else:
        
        print("Check buyer_shipping_id from related partner_id to Auction data.") 
        print(data_list.get('buyer_shipping_id').get('street'))
        print(res_partner.json().get('results')[0].get('id'))
        partner_address = [('parent_id', '=', res_partner.json().get('results')[0].get('id'))]
        res_partner_address = requests.get(
            "http://172.105.36.229:8069/api/res.partner?filters="+str(partner_address),
            headers = {'Access-Token': access_token},
            )
        print(res_partner_address.json())
        if res_partner_address.json().get('count') == 0:
            street_data = [
                    {
                        "parent_id": res_partner.json().get('results')[0].get('id'),
                        "type":'delivery',
                        "street": data_list.get('buyer_shipping_id').get('street'),
                        "street2": data_list.get('buyer_shipping_id').get('street2'),
                        "city": data_list.get('buyer_shipping_id').get('city'),
                        "zip":data_list.get('buyer_shipping_id').get('zip'),
                    }
                ]
            res_partner_address_id = requests.post(
                "http://172.105.36.229:8069/api/res.partner",
                headers = {
                    'Content-Type': 'text/html; charset=utf-8',
                    'Access-Token': access_token
                },data = json.dumps(street_data))
            data_list.update({
                                "buyer_billing_id": res_partner_address_id.json()[0].get('id'),
                                "buyer_shipping_id": res_partner_address_id.json()[0].get('id'),
                            })
        else:
            data_list.update({
                                "buyer_billing_id": res_partner_address.json().get('results')[0].get('id'),
                                "buyer_shipping_id": res_partner_address.json().get('results')[0].get('id'),
                            })

        data_list.update(partner_id = res_partner.json().get('results')[0].get('id'))


print(row_data_list)
# r = requests.post(
#     "http://172.105.36.229:8069/api/reverse.auction",
#     headers = {
#         'Content-Type': 'text/html; charset=utf-8',
#         'Access-Token': access_token
#     },data = json.dumps(row_data_list))
#     #verify = False      # for self-signed TLS/SSL certificates
print(r.text)
