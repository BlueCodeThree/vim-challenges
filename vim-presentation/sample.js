import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Blogs } from '../models/blog'

const Blog = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    {data.allMarkdownRemark.edges.map(post => (
        <>
        <div key={post.node.id}>
            <h3>{post.node.frontmatter.title}</h3>
            <small>Posted by {post.node.frontmatter.author} on {post.node.frontmatter.date}</small>
            <Link to={post.node.frontmatter.path}>Read More</Link>
        </div>
        <br />
        </>
    ))}
  </Layout>
)

export const pageQuery = graphql`
    query BlogIndexQuery {
        allMarkdownRemark(filter: {frontmatter: {template: {eq: "blog"}}}){
            edges{
                node{
                    id
                    frontmatter {
                    title
                    path
                    date
                    author
                    }
                }
            }
        }
    }
`

const getEntries = (req, res) => {
    getAllEntries(req)
        .sort({
            modified_date: -1
        })
        .exec((err, entries) => {
            if (err) {
                res.status(500);
                res.json({
                    error: err.message
                });
            }
            res.send(entries);
        });
};


