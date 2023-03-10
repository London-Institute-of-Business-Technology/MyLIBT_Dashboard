import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';


const Courses = () => {
    const classes = useStyles();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/brightcamp/')
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(data));
                setCourses(data.results);

            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    return (
        <div className={classes.mainContainer}>
            {
                courses.map((course) => (
                    <Card sx={{ maxWidth: 250 }} style={{ marginBottom: '30px' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://brightcamp.org${course.media.course_image.uri}`}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {course.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Code : {course.number}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Share
                            </Button>
                        </CardActions>
                    </Card>
                ))
            }
        </div>
    )
};

export default Courses;

const useStyles = makeStyles({
    mainContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'

    }
});