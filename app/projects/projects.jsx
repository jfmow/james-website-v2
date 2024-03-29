import Link from "next/link";
import styles from './Projects.module.css'
import PocketBase from 'pocketbase';
import Loader from './projectloader'
const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETURL)
pb.autoCancellation(false)

async function getProjects() {
  //const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  //await delay(5000);
  try {
    const data = await pb.collection('projects').getFullList(200 /* batch size */, { sort: '-created' });
    //{sort: '-created', filter: 'author = ""'}
    return data;
  } catch (err) {
    return {err}
  }

}

export default async function Projectss() {
  const projects1 = await getProjects();
  if(projects1.err){
    console.log('hi',projects1)
  }
  try {
    return (
      <div className={styles.main}>
        <div className={styles.projects}>
          {projects1.map((item) => (
            <>
              <div className={styles.card}>
                <div className={styles.carddetails} key={item.id}>
                  <p className={styles.texttitle} key={item.title}>{item.title}</p>
                  <p className={styles.textbody} key={item.updated}>Last updated: {item.updated}</p>
                </div>
                <Link className={styles.cardbutton} href={"/projects/" + item.id} key={item.name}>View project</Link>
              </div>
            </>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.log(error)
    return (
      <Loader errormsg='ALERT Load failed!' />
    )
  }
}
