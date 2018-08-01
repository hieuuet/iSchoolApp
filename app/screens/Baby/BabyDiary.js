import React, { Component, PureComponent } from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    UIManager,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    FlatList
} from "react-native";
import colors from '../../styles/colors';
import HeaderBack from "../../components/HeaderBack";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class BabyDiary extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
           
        };
    }

    renderItem = () => {
      return (
        <View style={styles.diaryItem}>
          <View style={styles.InfoItem}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center' }}> 
              <Image style={styles.avatarItem} source={{uri: 'https://www.parents.com/sites/parents.com/files/styles/width_300/public/images/p_101528432.jpg'}} />
              <View style={{marginLeft: 10}}>
                <Text style={styles.babyNameItem}>
                  Subin
                </Text>
                <Text style={styles.babyInfoItem}>
                  19 tháng . 8,5kg . 84cm
                </Text>
              </View>
            </View>
            <Text style={styles.babyInfo}>
              23/7
            </Text>
          </View>
          <Text style={styles.contentItem}>
            Sau 1 tuần nghỉ hè các bạn nhỏ trở lại lớp học rất ngoan và vô cùng hào hứng.Hôm nay các bạn nhỏ tiếp tục rèn kỹ năng cắt kéo.Có những bạn vẫn chưa cầm kéo tốt các con đã học cách xé những dải giấy theo đường dài…..
          </Text>
          <ScrollView horizontal={true} style={styles.galleryItem}>
            <Image source={require('../../images/demo/baby4.jpeg')} resizeMode="cover" style={styles.galleryImageItem} />
            <Image source={require('../../images/demo/baby4.jpeg')} resizeMode="cover" style={styles.galleryImageItem} />
            <Image source={require('../../images/demo/baby4.jpeg')} resizeMode="cover" style={styles.galleryImageItem} />
            <Image source={require('../../images/demo/baby4.jpeg')} resizeMode="cover" style={styles.galleryImageItem} />
          </ScrollView>
        </View>
      )
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
              <HeaderBack
                  backgroundColor={'#fd4176'}
                  title={"Nhật ký Subin"}
                  onPressLeft={()=>this.props.navigation.goBack()} />
              <ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: 'center'}}>
                {this.renderItem()}
                {this.renderItem()}
                {this.renderItem()}
              </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  diaryItem: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 7,
    marginTop: 15,
    paddingHorizontal: 15
  },
 
  babyNameItem: {
    color: '#fd4176',
    fontSize: 17,
    fontWeight: 'bold'
  },
  babyInfoItem:{
    fontSize: 13,
  },
  dateItem: {
    fontSize: 13,
  },
  contentItem: {
    fontSize: 15,
  },
  InfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  galleryItem: {
    marginVertical: 20,
  },
  galleryImageItem: {
    width: 150,
    height: 100,
    borderRadius: 4,
    marginLeft: 10
  },
});


export default BabyDiary;

