import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { IUploadFileProps, IUploadFileState } from '.'
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

export class UploadFile extends React.Component<IUploadFileProps, IUploadFileState> {

    constructor(props) {

        super(props)

        this.state = {
            file: null,
            file64Base: ''
        };

        this.uploadFileInComponent = this.uploadFileInComponent.bind(this);
        this.deleteFileInComponent = this.deleteFileInComponent.bind(this);
    }


    private uploadFileInComponent(e: any) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                file64Base: reader.result.split("base64,")[1],
            });

            this.props.uploadFile(this.state.file, this.state.file64Base);
        }
        reader.readAsDataURL(file);
    }


    private deleteFileInComponent(): void {
        var input = ReactDOM.findDOMNode(this.refs.fileInput) as HTMLInputElement;
        input.value = "";
        
        this.setState({
            file: null,
            file64Base: '',
        });

        this.props.deleteFile();
    }

    
    public render() {
        return (
            <div>
                <label className="ms-Label ms-custom-Label ms-fontWeight-regular space">{this.props.textHelp}</label>
                <div className="attachment-container">
                    {this.props.tinyComponent != true ?// verifica si se quiere ver grande o pequeño
                    <div className="upload-btn-wrapper">
                        <div className={this.props.disabled ? 'fake-input disabled' : 'fake-input' }>
                            <input 
                                className="fileInput" 
                                type="file" 
                                ref="fileInput" 
                                disabled={this.props.disabled} 
                                onChange={(e) => this.uploadFileInComponent(e)} />
                        </div>                        
                        <button type="button" className={this.props.disabled ? 'btn disabled' : 'btn' } disabled={this.props.disabled}>{this.props.valueButton}</button>
                    </div>
                    :
                    <div className="upload-btn-wrapper">
                        <div className={this.props.disabled ? 'fake-input disabled' : 'fake-input' }>
                            <input 
                                className="fileInput" 
                                type="file" 
                                ref="fileInput" 
                                disabled={this.props.disabled} 
                                onChange={(e) => this.uploadFileInComponent(e)} />
                        </div>
                        <button type="button" className={this.props.disabled ? 'btn disabled' : 'btn' } disabled={this.props.disabled}>{this.props.valueButton}</button>
                    </div>}
                    {this.state.file != null ?
                    <div className="attachment-file-name">
                        <span className="ms-font-l">{this.state.file.name}</span>
                        <i className="ms-Icon ms-Icon--Delete" aria-hidden="true" onClick={(e) => this.deleteFileInComponent()}></i>
                    </div> 
                    :
                    null}
                </div>
            </div>
        )
    }
}
