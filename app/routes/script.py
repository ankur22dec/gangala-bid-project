 row_product_brand = [
                                    {
                                                "name": category.get('product_brand_id'),
                                            }
                                        ]
                        res_product_brand_id = requests.post(
                                    "http://172.105.36.229:8072/api/product.brand",
                                    headers = {
                                        'Content-Type': 'text/html; charset=utf-8',
                                        'Access-Token': access_token
                                    },data = json.dumps(row_product_brand))