import React, { Component, PropTypes } from 'react';
import ArticleFooter from '../../../lib/article/article-footer.js';
import NavHeader from '../../../lib/nav-header/';
import Tag from '../../../lib/tags/tag.js';

export default class ArticleFullPage extends Component {
  render () {
    const { articleContent, backToSearch } = this.props;

    const tagColours = {
      amenities: 'rgba(12,125,125,0.6)',
      geo: 'rgba(12,125,12,0.6)'
    };

    /**
     * Render tags if exist.
     * @param  {[object]} tags    array of tag objects with 'value' and 'label'
     * @param  {string} tagsType  name of the tags type (amenities or geo for now)
     * @return {reactcomponent}   rendered tags
     */
    function renderTags (tags, tagsType) {
      if (tags && tags.length > 0) {
        tags.map((tag, key) => {
          return (
            <Tag key={key} displayName={tag.label} colour={tagColours[tagsType]} removeTag={() => {}}/>
          );
        });
      }
    }

    return (
      <section>
        <NavHeader backToSearch={backToSearch} />
        <div className='articleFullPageContainer'>
          { articleContent.sections.map((section, key) => {
            return (
              <section>
                {key === 0 && section.image ? <div className='articleHeader' style={{backgroundImage: `url(${section.image})`}} /> : null}
                <div key={key} className='articleSection'>
                  {key !== 0 && section.image ? <div className='articleImage' style={{backgroundImage: `url(${section.image})`}}> <img src={section.image}/> </div> : null}
                  {section.title ? (key === 0 ? <h1>{section.title}</h1> : <h2 >{section.title}</h2>) : null}
                  {section.text ? <p className='articleText'>{section.text}</p> : null}
                </div>
              </section>
            );
          })}
          <div className='tagSection'>
            {renderTags(articleContent.geo, 'geo')}
            {renderTags(articleContent.amenities, 'amenities')}
          </div>
        </div>
        <ArticleFooter />
      </section>
    );
  }
}

ArticleFullPage.propTypes = {
  articleContent: PropTypes.object,
  backToSearch: PropTypes.func
};
