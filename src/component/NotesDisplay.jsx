/**
 * @description Component to display Notes
 * @author Yash
 * @since 8/12/18
 * @version 1.12
 */

import React from 'react';
import { Card, Chip, Avatar } from '@material-ui/core';
import NoteService from '../service/NoteService';
import ReminderPopper from './ReminderPopper';
import ColorSection from './ColorSection';
import ArchiveNote from './ArchiveNote';
import MoreOptions from './MoreOptions';

// const NoteServiceClassObject = NoteService.NoteServiceClass();

let notesLayout;
export default class NotesDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notesDisplay: []
        }
    }

    getBackGroundColor = (colorSelected, note) => {
        let newNotesArray = this.state.notesDisplay;

        let request = {
            thread: "/updateNote",
            data: {
                note: {
                    _id: note._id,
                    color: colorSelected
                }
            }
        }
        NoteService.NotesUpdation(request);
        // NoteServiceClassObject.NotesUpdation(request);

        for (let i = 0; i < newNotesArray.length; i++) {
            if (note._id === newNotesArray[i]._id) {
                newNotesArray[i].color = colorSelected

                // console.log('running status -----------', newNotesArray[i].color);

                this.setState({
                    notesDisplay: newNotesArray
                })
            }
        }
    }

    handleNoteEditingDialog = () => {
        this.setState({
            dialogStatus: !this.state.dialogStatus
        });
    }

    // handleCardSelected = (noteSelected) => {
    //     let newNotesArray = this.state.notesDisplay;
    //     console.log('color set in state in card select -------', this.state.colorSelect);
    //     for(let i = 0; i<newNotesArray.length; i++)
    //     {
    //         if(noteSelected._id === newNotesArray[i]._id){
    //             newNotesArray[i].color = noteSelected.color

    //             console.log('running status -----------', newNotesArray[i].color );


    //             this.setState({
    //                 notesDisplay:newNotesArray
    //             })        
    //         }
    //     }
    //     // noteSelected.color = this.state.colorSelect;

    // }

    getReminder = (reminderSet) => {
        return reminderSet;
    }

    componentDidMount() {
        let request = {
            thread: "/noteDisplay"
        }

        var self = this;

        NoteService.NoteDisplay(request, (err, data) => {

            if (data !== null && data !== undefined) {
                self.setState({
                    notesDisplay: data
                })
            }
            else {
                self.setState({
                    message_display: []
                })
            }
        });
    }

    render() {
        let NotesDisplayDivClass;
        if (this.props.sidebarStatus) {
            NotesDisplayDivClass = "NotesDisplayDivSidebarOpen";
        }
        else {
            NotesDisplayDivClass = "NotesDisplayDivSidebarClose";
        }

        if (this.props.notesView) {
            notesLayout = "grid";
        }
        else {
            notesLayout = "list";
        }

        return (
            <div className={NotesDisplayDivClass} >
                {notesLayout === "grid" ? (
                    <div className="notesGridDisplayDiv" >
                        {this.state.notesDisplay.map((option, index) => (
                            <Card key={index} className="notesGridDisplayCard" >

                                <div style={{ backgroundColor: option.color, width: "-webkit-fill-available" }} >
                                    <div className="noteCardDisplayTitle" >
                                        {option.title}
                                    </div>
                                    <div className="noteCardDisplayDescription" >
                                        {option.description}
                                    </div>
                                    <div >
                                        <Chip
                                            icon={<img className="reminderClock" src={require('../assets/images/clocktime.svg')} alt="reminderClock" />}
                                            label={<span className="reminderShowOnCardText" >  {option.reminder} </span>}
                                            onDelete
                                            variant="outlined"
                                            className="chipOnCardReminder"
                                        />
                                    </div>
                                    <div>
                                        <ReminderPopper getReminder = {this.getReminder} noteSelected = {option} />
                                        <img className="noteAddFeatureImages" src={require('../assets/images/personAdd.svg')} alt="addPerson" />
                                        <ColorSection getColor={this.getBackGroundColor} option={option} />
                                        <img className="noteAddFeatureImages" src={require('../assets/images/imageAdd.svg')} alt="uploadImage" />
                                        <ArchiveNote />
                                        <MoreOptions />
                                    </div>
                                </div>


                            </Card>
                        ))}
                    </div>
                ) : (
                        <div className="notesListDisplayDiv" >
                            {this.state.notesDisplay.map((option, index) => (
                                <Card className="notesListDisplayCard" >

                                    <div style={{ backgroundColor: option.color, width: '100%' }} >
                                        <div className="noteCardDisplayTitle" >
                                            {option.title}
                                        </div>
                                        <div className="noteCardDisplayDescription" >
                                            {option.description}
                                        </div>
                                        <div>
                                            {option.reminder}
                                        </div>
                                        <div>
                                            <ReminderPopper getReminderChooseOption={this.getReminder} />
                                            <img className="noteAddFeatureImages" src={require('../assets/images/personAdd.svg')} alt="addPerson" />
                                            <ColorSection getColor={this.getBackGroundColor} />
                                            <img className="noteAddFeatureImages" src={require('../assets/images/imageAdd.svg')} alt="uploadImage" />
                                            <ArchiveNote />
                                            <MoreOptions />
                                        </div>
                                    </div>

                                </Card>
                            ))}
                        </div>
                    )}

            </div>
        )
    }
}