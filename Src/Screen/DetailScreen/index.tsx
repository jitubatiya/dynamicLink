import React, { useEffect, useState } from 'react';
import styles from './styles';
import axios from "axios";
import { View, Text, Image, TouchableOpacity, ScrollView, Share } from "react-native";
import { ImageSlider } from "react-native-image-slider-banner";
import { Images } from '../../Resources/images';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const DetailScreen = (props: any) => {
    const [id] = useState(props.route.params.id)
    const [productDetail, setProductDetail] = useState(Object)
    const [images, setImages] = useState([])
    useEffect(() => {
        getProductDetail();
    }, [])
    const getProductDetail = () => {
        axios.get('https://dummyjson.com/products/' + id)
            .then(function (response) {
                if (response.status == 200) {
                    setProductDetail(response.data)
                    let newArray = new Array();
                    for (var i = 0; i < response.data.images.length; i++) {
                        newArray.push({ img: response.data.images[i] })
                    }
                    setImages(newArray)
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const createDynamicLinks = async () => {

        const link = await dynamicLinks().buildShortLink({
            link: "https://wobbpractical.page.link/id?share_id=" + productDetail.id,
            // domainUriPrefix is created in your Firebase console
            domainUriPrefix: 'https://wobbpractical.page.link',

            android: {
                packageName: 'com.wobbpractical',
                // fallbackUrl: "https://testquestion.com/id?share_id=" + shareData.id + "&flag=" + shareData.flag,

            },
            social: {
                title: productDetail.category,
                imageUrl: productDetail.thumbnail,
                descriptionText: productDetail.descriptionText
            },
            navigation: {
                forcedRedirectEnabled: true,
            },

        });
        onShare(link)
    }
    const onShare=async(link: any)=> {
        try {
            const result = await Share.share({
              message:link,
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error: any) {
          }
    }
    return (
        <ScrollView style={styles.container}>
            <ImageSlider
                data={images}
                autoPlay={true}
                onItemChanged={(item) => console.log("item", item)}
                closeIconColor="#fff"
                showHeader
                preview={false}
                headerLeftComponent={<TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                    <Image source={Images.backIcon} style={{ height: 30, width: 30 }} resizeMode={"contain"} />
                </TouchableOpacity>}
                headerRightComponent={<TouchableOpacity onPress={() => createDynamicLinks()}>
                    <Image source={Images.shareIcon} style={{ height: 30, width: 30, tintColor: "white" }} resizeMode={"contain"} />
                </TouchableOpacity>}
                headerStyle={{ padding: 10, backgroundColor: 'rgba(0,0,0, 0.6)', }}
                caroselImageStyle={{ resizeMode: 'stretch' }}
            />
            <View style={styles.txtDataView}>
                <View style={{ flex: 0.25 }}>
                    <Text style={styles.txtLabel}>{"Brand"}</Text>
                    <Text style={styles.txtValue}>{productDetail?.brand}</Text>
                </View>
                <View style={{ flex: 0.25 }}>
                    <Text style={styles.txtLabel}>{"Price"}</Text>
                    <Text style={styles.txtValue}>{productDetail?.price}</Text>
                </View>
                <View style={{ flex: 0.25 }}>
                    <Text style={styles.txtLabel}>{"Stock"}</Text>
                    <Text style={styles.txtValue}>{productDetail?.stock}</Text>
                </View>
                <View style={{ flex: 0.25 }}>
                    <Text style={styles.txtLabel}>{"Rating"}</Text>
                    <Text style={styles.txtValue}>{productDetail?.rating}</Text>
                </View>
            </View>
            <View style={{ marginHorizontal: 30, }}>
                <Text style={styles.txtLabel}>{"Category"}</Text>
                <Text style={styles.txtValue}>{productDetail?.category}</Text>
            </View>
            <View style={{ marginHorizontal: 30, marginVertical: 10 }}>
                <Text style={styles.txtLabel}>{"Description"}</Text>
                <Text style={styles.txtValue}>{productDetail?.description}</Text>
            </View>
        </ScrollView>
    )
}
export default DetailScreen;