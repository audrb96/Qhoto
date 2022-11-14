<Modal
  animationType="none"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}>
  <Pressable
    style={styles.centeredView}
    onPress={() => {
      setModalVisible(!modalVisible);
    }}>
    <Pressable style={styles.modalView}>
      <SelectedFeed parentFunction={parentFunction} props={selectedFeedId} />
    </Pressable>
  </Pressable>
</Modal>;
