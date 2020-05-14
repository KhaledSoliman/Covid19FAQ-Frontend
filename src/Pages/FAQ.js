import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Copyright from "../Components/Copyright";
import Box from "@material-ui/core/Box";


const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random?coronavirus)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

class FAQ extends React.Component {
    state = {
        answer: '',
        question: '',
    };

    constructor(props) {
        super(props);
    }

    onQuestion(e) {
        e.preventDefault();
        axios.get('http://localhost:3001/faq/', {
            params: {
                question: e.target.value
            }
        }).then(function (response) {
            console.log(response);
            this.setState({question:response.data[0].question, answer: response.data[0].answer});
        }.bind(this)).catch(function (error) {
        });
    }

    render() {
        const questions = [
            {
                question: "What is a novel coronavirus?",
            },
            {
                question: "What is the souce of the virus?",
            },
            {
                question: "How does the virus spread? ",
            },
            {
                question: "Why are we seeing a rise in cases?",
            },
            {
                question: "Can someone who had COVID-19 spread the illness to others?",
            },
            {
                question: "Can I get sick with COVID-19 if it is on food?",
            },
            {
                question: "Will warm weather stop the outbreak of COVID-19?"
            },
            {
                question: "What is the risk of my child being sick with COVID-19?"
            }
        ];
        const {classes} = this.props;
        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            <QuestionAnswerIcon/> Frequently Asked Questions About COVID-19
                        </Typography>
                        <FormControl margin={"normal"}>
                            <InputLabel  id="questionLabel">
                                Question
                            </InputLabel>
                            <Select
                                labelId="questionLabel"
                                id="question"
                                autoWidth={true}
                                onChange={e => this.onQuestion(e)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {questions.map((obj, index) => {
                                    return <MenuItem key={index} value={obj.question}>{obj.question}</MenuItem>
                                })}
                            </Select>
                            <FormHelperText>Please Select your question</FormHelperText>
                        </FormControl>
                        {this.state.question !== '' && this.state.answer !== '' &&
                        <Box mt={5}>
                            <ExpansionPanel defaultExpanded={true}>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography className={classes.heading}>{this.state.question}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Typography>
                            {this.state.answer}
                            </Typography>
                            </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Box>
                        }
                    </div>
                    <Box mt={5}>
                        <Copyright/>
                    </Box>
                </Grid>
                <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            </Grid>
        );
    }

}

FAQ.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FAQ);
