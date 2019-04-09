import React, { Component } from "react";
import { Button, Card, Modal } from "antd";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjs from "draftjs-to-html";

export default class Rich extends Component {
  state = {
    editorState: '',
    contentState: '',
    showRichText: false
  };
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };
  onEditorChange = (contentState) => {
    this.setState({
      contentState
    })
  }
  handleClearContent = () => {
    this.setState({
      editorState: ''
    })
  }
  handleGetContent = () => {
    this.setState({
      showRichText: true
    })
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
          <Button type="primary" onClick={this.handleGetContent}>获取文本</Button>
        </Card>
        <Card title="富文本编辑器">
          <Editor
            editorState={editorState}
            onContentStateChange={this.onEditorChange}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <Modal title="富文本" visible={this.state.showRichText} footer={null} onCancel={() => {this.setState({showRichText: false})}}>
          {
            draftjs(this.state.contentState)
          }
        </Modal>
      </div>
    );
  }
}
