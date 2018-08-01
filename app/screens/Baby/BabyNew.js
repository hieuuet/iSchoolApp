import React, { Component } from "react";
import {
    ScrollView,
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from "react-native";
import AvaFriend from "../../components/AvaFriend";
import PopupActiveInDay from "../../components/PopupActiveInDay";
import PopupFoodsInDay from "../../components/PopupFoodsInDay";


export default class Baby extends Component {
  
  state = {
    numberOfLinesContent: 4,
    showPopupActiveInDay: false,

  }

  moreContent = () => {
    this.setState({
      numberOfLinesContent: 10
    })
  }

  showPopupActiveInDay = () => {
    this.setState({
      showPopupActiveInDay: true,
    })
  }

  closePopupActiveInDay = () => {
    this.setState({
      showPopupActiveInDay: false,
    })
  }

  showPopupFoodsInDay = () => {
    this.setState({
      showPopupFoodsInDay: true,
    })
  }

  closePopupFoodsInDay = () => {
    this.setState({
      showPopupFoodsInDay: false,
    })
  }

  renderPopupActiveInDay = () => {
    return (
      <PopupActiveInDay closePopup={this.closePopupActiveInDay} />
    )
  }

  renderPopupFoodsInDay = () => {
    return (
      <PopupFoodsInDay closePopup={this.closePopupFoodsInDay} />
    )
  }

  render() {
    let content = 'Sau 1 tuần nghỉ hè các bạn nhỏ trở lại lớp học rất ngoan và vô cùng hào hứng.Hôm nay các bạn nhỏ tiếp tục rèn kỹ năng cắt kéo.Có những bạn vẫn chưa cầm kéo tốt các con đã học cách xé những dải giấy theo đường dài. Sau 1 tuần nghỉ hè các bạn nhỏ trở lại lớp học rất ngoan và vô cùng hào hứng.Hôm nay các bạn nhỏ tiếp tục rèn kỹ năng cắt kéo.Có những bạn vẫn chưa cầm kéo tốt các con đã học cách xé những dải giấy theo đường dài '
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center' }}> 
            <Image style={styles.avatar} source={{uri: 'https://www.parents.com/sites/parents.com/files/styles/width_300/public/images/p_101528432.jpg'}} />
            <View style={{marginLeft: 10}}>
              <Text style={styles.babyName}>
                Subin
              </Text>
              <Text style={styles.babyInfo}>
                19 tháng . 8,5kg . 84cm
              </Text>
            </View>
          </View>
          <AvaFriend listAva={[
              "https://www.parents.com/sites/parents.com/files/styles/width_300/public/images/p_101528432.jpg",
              "https://www.parents.com/sites/parents.com/files/styles/width_300/public/images/p_101528432.jpg",
              "https://www.parents.com/sites/parents.com/files/styles/width_300/public/images/p_101528432.jpg"
          ]}/>
        </View>
        <ScrollView style={{flex: 1}}>
          <View style={{backgroundColor: '#fd4176', paddingHorizontal: 15, paddingTop: 10}} >
            <Text numberOfLines={this.state.numberOfLinesContent} style={styles.content}>
              {content}
            </Text>
            {this.state.numberOfLinesContent === 4 &&
              <TouchableOpacity onPress={this.moreContent} style={{paddingVertical: 5}}>
                <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white'}}>
                  Đọc tiếp
                </Text>
              </TouchableOpacity>
            }
            <View style={{height: 100}} />
          </View>
          <ScrollView horizontal={true} style={styles.galleryContent}>
            <Image source={require('../../images/demo/baby4.jpeg')} resizeMode="cover" style={styles.galleryImage} />
            <Image source={require('../../images/demo/baby4.jpeg')} resizeMode="cover" style={styles.galleryImage} />
            <Image source={require('../../images/demo/baby4.jpeg')} resizeMode="cover" style={styles.galleryImage} />
            <Image source={require('../../images/demo/baby4.jpeg')} resizeMode="cover" style={styles.galleryImage} />
          </ScrollView>
          <View style={{padding: 10, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('BabyDiary')} style={styles.btnnk}>
              <Text style={styles.btnTxtnk}>
                Nhật ký Subin
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('BabyAlbum')} style={styles.btn}>
              <Text style={styles.btnTxt}>
                Tất cả Album
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{padding: 10, flexDirection: 'row'}}>
            <ActiveInDay title={'Hoạt động trong ngày'} onPress={() => this.showPopupActiveInDay()} icon={require('../../images/baby/symbolBabyPlay.png')} />
            <ActiveInDay title={'Thực đơn trong ngày'} onPress={() => this.showPopupFoodsInDay()} icon={require('../../images/baby/symbolBabyPlay.png')} />
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('BabyMenu')} style={{marginTop: 20, marginHorizontal: 15, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{ width: '100%'}} source={require("../../images/baby/imgWeeklyMenu.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('BabySchedule')} style={{marginHorizontal: 15, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{ width: '100%', resizeMode: 'contain'}} source={require("../../images/baby/active.png")} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row'}}>
            <PersonalButton title={"Sức khỏe"} icon={require("../../images/baby/shield.png")} />
            <PersonalButton title={"Camera"} icon={require("../../images/baby/cctv.png")} />
            <PersonalButton title={"Xin nghỉ"} icon={require("../../images/baby/profiles.png")} />
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 40}}>
            <Text style={{color: 'rgb(171,180,189)'}}>
              - THÔNG BÁO MỚI -
            </Text>
            <Text style={{color: 'black', marginTop: 10, fontWeight: '600', fontSize: 15}}>
              V/V Tham quan Thủy cung Vinpearl
            </Text>
            <View style={{paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#fd4176', borderRadius: 4, marginTop: 20}}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Đọc thêm
              </Text>
            </View>
          </View>
        </ScrollView>
        {this.state.showPopupActiveInDay && this.renderPopupActiveInDay()}
        {this.state.showPopupFoodsInDay && this.renderPopupFoodsInDay()}
      </View>
    )
  }
}

const PersonalButton = ({title, icon}) => {
  return (
    <View style={styles.personalAction}>
      <Image style={{width: 50, height: 50, resizeMode: 'contain'}} source={icon} />
      <Text style={{color: 'rgb(171,180,189)', marginTop: 10}}>
        {title}
      </Text>
    </View>
  )
}
 
const ActiveInDay = ({title, icon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.viewInDay}>
      <Image style={{zIndex: 1, width: 78, height: 78, marginBottom: -40}} source={icon} />
      <View style={styles.btnInDay}>
        <View style={{flex: 1}} />
        <View style={{width: '100%', height: 55, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fd4176', borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
          <Text style={styles.txtInDay}>
            {title}
          </Text>
        </View>
      </View>
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fd4176',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 15
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 3
  },
  babyName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  babyInfo:{
    color: 'white',
    fontSize: 13,
  },
  content: {
    color: 'white',
    fontSize: 15,
  },
  galleryContent: {
    marginTop: -60,
  },
  galleryImage: {
    width: 150,
    height: 100,
    borderRadius: 4,
    marginLeft: 10
  },
  btn: {
    height: 45,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    flex: 1
},
btnnk: {
  height: 45,
  marginHorizontal: 20,
  backgroundColor: '#fd4176',
  borderRadius: 100,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: 10,
  shadowColor: '#fd4176',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 2,
  flex: 1
},
  viewInDay: {
    marginHorizontal: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
    flex: 1
  },
  btnInDay: {
    width: '100%',
    height: 145,
    marginHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1
  },
  txtInDay: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  btnTxt: {
      color: '#fd4176',
      fontWeight: '600',
      fontSize: 14
  },
  btnTxtnk: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14
},
  
  personalAction: {
    width: (Dimensions.get('window').width - 40) / 3,
    height: (Dimensions.get('window').width - 40) / 3,
    borderRadius: 7,
    marginLeft: 10,
    borderColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})